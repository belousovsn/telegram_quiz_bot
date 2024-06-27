const { getTotalQuestions, resetQuiz } = require('../domain/quizService');
const { recordAnswer, clearAnswers, resetUserScores } = require('../domain/userService');
const { questionTimer } = require('../../../libraries/utils/config');
const { log } = require('./utils/logger');
const { selectRound, getCurrentRound } = require('./roundManager');
const { askNextQuestion, askQuestion, evaluateAndProceed, revealAnswer, endQuiz } = require('./questionManager');
const { updateTimer } = require('./timerManager');
const { evaluateAnswers, announceQuestionWinners, logQuestionResults } = require('./scoreManager');
const { getUserState, setUserState, deleteUserState } = require('./userStateManager');

const startQuiz = (msg, bot) => {
    const chatId = msg.chat.id;
    console.log(`Starting quiz for chat ${chatId}`);
    
    if (getUserState(chatId)) {
        console.log(`Quiz already in progress for chat ${chatId}`);
        bot.sendMessage(
            chatId,
            "A quiz is already in progress. You can continue participating in the current quiz."
        );
        return;
    }
    
    const currentRound = getCurrentRound();
    if (!currentRound) {
        console.log(`No round selected for chat ${chatId}`);
        bot.sendMessage(
            chatId,
            "Please select a round first using the 'Select Round' option."
        );
        return;
    }
    
    console.log(`Current round: ${currentRound}`);
    resetUserScores();
    resetQuiz();
    
    // Ensure the round is properly loaded
    if (!selectRound(currentRound)) {
        console.log(`Failed to load round ${currentRound} for chat ${chatId}`);
        bot.sendMessage(chatId, "Error: Failed to load the selected round. Please try selecting the round again.");
        return;
    }
    
    setUserState(chatId, {
        currentQuestionNumber: 0,
        activeUsers: new Map(),
        answeredUsers: new Set(),
    });
    
    console.log(`User state set for chat ${chatId}`);
    log(`Quiz started in chat ${chatId}`, chatId, "START");
    
    const totalQuestions = getTotalQuestions();
    console.log(`Total questions in the round: ${totalQuestions}`);
    
    if (totalQuestions > 0) {
        console.log(`Starting first question for chat ${chatId}`);
        askNextQuestion(chatId, bot, getUserState(chatId));
    } else {
        console.log(`No questions available for chat ${chatId}`);
        bot.sendMessage(chatId, "Error: No questions available for this round. Please try selecting a different round.");
        endQuiz(chatId, bot);
    }
};

const stopQuiz = (msg, bot) => {
    const chatId = msg.chat.id;
    const userState = getUserState(chatId);
    if (!userState) {
        bot.sendMessage(chatId, "There is no active quiz to stop.");
        return;
    }
    if (userState.timeout) {
        clearTimeout(userState.timeout);
    }
    if (userState.timerInterval) {
        clearInterval(userState.timerInterval);
    }
    log(`Quiz stopped manually in chat ${chatId}`, chatId, "STOP");
    endQuiz(chatId, bot);
    bot.sendMessage(chatId, "The quiz has been stopped.");
};

const handleAnswerSelection = (callback_query, bot) => {
    const chatId = callback_query.message.chat.id;
    const userId = callback_query.from.id;
    const answer = callback_query.data;
    const userNickname =
        callback_query.from.username ||
        callback_query.from.first_name ||
        `User${userId}`;
    const userState = getUserState(chatId);
    if (userState && !userState.answeredUsers.has(userId)) {
        recordAnswer(chatId, userId, answer);
        userState.answeredUsers.add(userId);
        userState.activeUsers.set(userId.toString(), userNickname);
        bot.answerCallbackQuery(callback_query.id, { text: "Answer recorded" });
        log(
            `User ${userNickname} (${userId}) answered question ${userState.currentQuestionNumber}`,
            chatId,
            "ANSWER"
        );
    } else {
        bot.answerCallbackQuery(callback_query.id, {
            text: "You have already answered",
        });
    }
};

module.exports = {
    startQuiz,
    stopQuiz,
    handleAnswerSelection,
    selectRound,
    getCurrentRound
};