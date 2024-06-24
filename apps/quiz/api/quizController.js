const bot = require('../../..');
const { getQuestion, getCorrectAnswerText, getNextQuestion, getCorrectAnswerIndex } = require('../domain/quizService');
const { recordAnswer, getUserAnswers, clearAnswers } = require('../domain/userService');
const { questionTimer } = require('../../../libraries/utils/config')

let currentQuestionNumber = 0;

const startQuiz = (msg, bot) => {
    const chatId = msg.chat.id;
    currentQuestionNumber = 0;
    const question = getQuestion(currentQuestionNumber);
    if (question) {
        askQuestion(chatId, question, bot);
    }
    else {
        bot.sendMessage(chatId, 'No questions available');
    }
};

const askQuestion = async (chatId, question, bot) => {
    clearAnswers();
    const options = {
        reply_markup: {
            inline_keyboard: [
              question.answers.map((answer, index) => ({
                text: answer,
                callback_data: `${index}`
              }))
            ]
        }
    }
    bot.sendMessage(chatId, question.question_text, options);
    //Reveal the answer in a time period
    
    const timeToAnswer = questionTimer;
    setTimeout(() => {
        let correctUsers = evaluateAnswers(question);
        console.log('correct Users after evaluate', correctUsers)
        revealAnswer(chatId, question, bot);
        announceQuestionWinners(chatId, bot, correctUsers)
    }, timeToAnswer);
};

const revealAnswer = (chatId, question, bot) => {
    const correctAnswer = getCorrectAnswerText(question);
    bot.sendMessage(chatId, `The correct answer is: ${correctAnswer}`);
};

const handleAnswerSelection = (callback_query, bot) => {
    const msg = callback_query.message;
    const userId = callback_query.from.id;
    const answer = callback_query.data;
    //check answer
    console.log('answer after click: ', answer)
    //recording answer
    recordAnswer(userId, answer);
    bot.answerCallbackQuery(callback_query.id, {text: 'Answer recorded'});
}

const evaluateAnswers = (question) => {
    const correctUsers = [];
    const correctAnswer = getCorrectAnswerIndex(question);
    //debug
    console.log('correctAnswer', correctAnswer, typeof(correctAnswer))
    let userAnswers = getUserAnswers();
    //debug
    console.log('evaluateAnswers ^', userAnswers)
    Object.keys(userAnswers).forEach(userId => {
        if (correctAnswer === parseInt(userAnswers[userId])) {
            correctUsers.push(userId)
        }
    })
    console.log('correct users: ', correctUsers)
    return correctUsers
}

const announceQuestionWinners = async (chatId, bot, correctUsers) => {
    let announceText = `Users that answered correctly: `
    correctUsers.forEach(userId => {
        announceText + userId;
    })
    bot.sendMessage(chatId, announceText)
}

module.exports = {
    startQuiz,
    askQuestion,
    revealAnswer,
    handleAnswerSelection
}