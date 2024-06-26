let chatAnswers = {};
let userScores = {};

const recordAnswer = (chatId, userId, answer) => {
    if (!chatAnswers[chatId]) {
        chatAnswers[chatId] = {};
    }
    chatAnswers[chatId][userId] = answer;
};

const getUserAnswers = (chatId) => {
    return chatAnswers[chatId] || {};
};

const clearAnswers = (chatId) => {
    chatAnswers[chatId] = {};
};

const incrementUserScore = (userId) => {
    if (!userScores[userId]) {
        userScores[userId] = 0;
    }
    userScores[userId]++;
};

const getUserScore = (userId) => {
    return userScores[userId] || 0;
};

const resetUserScores = () => {
    userScores = {};
};

module.exports = {
    recordAnswer,
    getUserAnswers,
    clearAnswers,
    incrementUserScore,
    getUserScore,
    resetUserScores
};