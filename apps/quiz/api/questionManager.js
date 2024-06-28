const { getQuestion, getCorrectAnswerText, getCorrectAnswerIndex, getTotalQuestions } = require('../domain/quizService');
const { getUserScore } = require('../domain/userService')
const { log } = require('./utils/logger');
const { questionTimer } = require('../../../libraries/utils/config');
const { updateTimer } = require('./timerManager');
const { evaluateAnswers, announceQuestionWinners, logQuestionResults } = require('./scoreManager');
const { getUserState, setUserState, deleteUserState } = require('./userStateManager');

const askNextQuestion = (chatId, bot) => {
        //console.log('NEXT Q START')
    const userState = getUserState(chatId);
    if (!userState) return;
    const { currentQuestionNumber } = userState;
        //console.log('initial q number in askNQ: ', currentQuestionNumber)
        //console.log('userState: ', userState)
    if (currentQuestionNumber >= getTotalQuestions()) {
        endQuiz(chatId, bot);
        return;
    }
    const question = getQuestion(currentQuestionNumber);
    if (question) {
        log(
            `Starting question ${currentQuestionNumber + 1} in chat ${chatId}`,
            chatId,
            "QUESTION_START"
        );
        askQuestion(chatId, question, bot);
        setUserState(chatId, {
            ...userState,
            currentQuestionNumber: currentQuestionNumber + 1,
            answeredUsers: new Set(),
        });
        //console.log('currentQnumber value', currentQuestionNumber)
        //console.log('question number', getUserState.currentQuestionNumber)
    } else {
        bot.sendMessage(chatId, "No more questions available");
        endQuiz(chatId, bot);
    }
    //console.log('NEXT Q END')
};

const askQuestion = async (chatId, question, bot) => {
        //console.log('ASK QUESTION START')
    const options = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: question.answers[0], callback_data: '0' },
                    { text: question.answers[1], callback_data: '1' }
                ],
                [
                    { text: question.answers[2], callback_data: '2' },
                    { text: question.answers[3], callback_data: '3' }
                ]
            ]
        }
    };
    let userState = getUserState(chatId);
    const totalQuestions = getTotalQuestions();
    const remainingTime = Math.floor(questionTimer / 1000);
    const messageText = `Question ${userState.currentQuestionNumber + 1}/${totalQuestions}\n\n${question.question_text}\n\n\u23F0 Time remaining: ${remainingTime} second${remainingTime !== 1 ? 's' : ''}`;
    const questionMessage = await bot.sendMessage(chatId, messageText, options);
    const timerInterval = setInterval(() => updateTimer(chatId, bot, questionMessage.message_id, totalQuestions), 1000);
    const timeout = setTimeout(() => evaluateAndProceed(chatId, question, bot), questionTimer);
    
    //update userState before setting
    userState = getUserState(chatId);
    setUserState(chatId, { 
        ...userState, 
        timeout, 
        timerInterval, 
        questionMessageId: questionMessage.message_id, 
        startTime: Date.now(),
        currentQuestion: question.question_text,
        currentOptions: options.reply_markup,
        counter: 0
    });
        //console.log('ASK QUESTION END')
        //console.log(userState)
};

const evaluateAndProceed = async (chatId, question, bot) => {
    //console.log('EVALUATE START')

    const userState = getUserState(chatId);
    if (!userState) {
        log(`Quiz stopped unexpectedly in chat ${chatId}`, chatId, "ERROR");
        return;
    }

    // Ensure the final update is performed
    updateTimer(chatId, bot, userState.questionMessageId, getTotalQuestions());

    clearInterval(userState.timerInterval);
    const correctUsers = evaluateAnswers(chatId, question, userState);
    await revealAnswer(chatId, question, bot);
    await announceQuestionWinners(chatId, bot, correctUsers);
    log(
        `Ending question ${userState.currentQuestionNumber} in chat ${chatId}`,
        chatId,
        "QUESTION_END"
    );
    logQuestionResults(chatId, userState);
    
    // Add a pause before asking the next question
    //console.log('EVALUATE END')
    setTimeout(() => askNextQuestion(chatId, bot), 3000);
};

const revealAnswer = async (chatId, question, bot) => {
        //console.log('REVEAL START')
    const correctAnswer = getCorrectAnswerText(question);
    await bot.sendMessage(chatId, `Time's up! The correct answer is: ${correctAnswer}`);
    
    // Edit the original message to show correct/incorrect answers
    const userState = getUserState(chatId);
    const correctIndex = getCorrectAnswerIndex(question);
    const newKeyboard = question.answers.map((answer, index) => ({
        text: answer + (index === correctIndex ? ' \u2705' : ' \u274C'),
        callback_data: index.toString()
    }));
    
    const options = {
        chat_id: chatId,
        message_id: userState.questionMessageId,
        reply_markup: {
            inline_keyboard: [
                [newKeyboard[0], newKeyboard[1]],
                [newKeyboard[2], newKeyboard[3]]
            ]
        }
    };
    
    await bot.editMessageReplyMarkup(options.reply_markup, options);
    //console.log('REVEAL END')
};

const endQuiz = async (chatId, bot) => {
    const userState = getUserState(chatId);
    if (!userState) return;
    let finalScores = "Quiz ended! Final scores: \n";
    for (const [userId, userNickname] of userState.activeUsers) {
        const score = getUserScore(userId);
        finalScores += `${userNickname}: ${score} points\n`;
    }
    await bot.sendMessage(chatId, finalScores);
    log(`Quiz ended in chat ${chatId}. ${finalScores}`, chatId, "END");
    deleteUserState(chatId);
};

module.exports = {
    askNextQuestion,
    askQuestion,
    evaluateAndProceed,
    revealAnswer,
    endQuiz
};