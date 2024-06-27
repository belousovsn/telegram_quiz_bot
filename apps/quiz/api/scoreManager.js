const { getUserScore, incrementUserScore, getUserAnswers} = require('../domain/userService');
const { getCorrectAnswerIndex } = require('../domain/quizService')
const { log } = require('./utils/logger');

const evaluateAnswers = (chatId, question, userState) => {
    const correctUsers = [];
    const correctAnswer = getCorrectAnswerIndex(question);
    const userAnswers = getUserAnswers(chatId);
    //const currentUserState = userState.get(chatId);
    for (const [userId, answer] of Object.entries(userAnswers)) {
      if (correctAnswer === parseInt(answer)) {
        const userNickname = userState.activeUsers.get(userId.toString());
        if (userNickname) {
          correctUsers.push(userNickname);
          incrementUserScore(userId);
        } else {
          log(`User nickname not found for userId: ${userId}`, chatId, "ERROR");
        }
      }
    }
    return correctUsers;
};

const announceQuestionWinners = async (chatId, bot, correctUsers) => {
    let announceText =
      correctUsers.length > 0
        ? `Users that answered correctly: ${correctUsers.join(", ")}`
        : "No one answered correctly this time.";
    await bot.sendMessage(chatId, announceText);
};

const logQuestionResults = (chatId, userState) => {
    let questionResults = `Question ${userState.currentQuestionNumber} results:`;
    for (const [userId, userNickname] of userState.activeUsers) {
      const score = getUserScore(userId);
      questionResults += `${userNickname}: ${score} points`;
    }
    log(questionResults, chatId, "QUESTION_RESULTS");
};

module.exports = {
    evaluateAnswers,
    announceQuestionWinners,
    logQuestionResults
};