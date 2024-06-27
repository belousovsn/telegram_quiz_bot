const { getQuestion, getCorrectAnswerText, getCorrectAnswerIndex, getTotalQuestions, resetQuiz, loadRound } = require('../domain/quizService');
const { recordAnswer, getUserAnswers, clearAnswers, getUserScore, resetUserScores, incrementUserScore } = require('../domain/userService');
const { questionTimer } = require('../../../libraries/utils/config');
const { log } = require('./utils/logger');

const userStates = new Map();
let currentRound = null;

const selectRound = (roundNumber) => {
    console.log(`Selecting round ${roundNumber}`);
    try {
        loadRound(roundNumber);
        currentRound = roundNumber;
        console.log(`Round ${roundNumber} successfully selected and loaded.`);
        return true;
    } catch (error) {
        console.error(`Error selecting round ${roundNumber}:`, error.message);
        return false;
    }
};

const getCurrentRound = () => {
    console.log(`Current round: ${currentRound}`);
    return currentRound;
};

const startQuiz = (msg, bot) => {
    const chatId = msg.chat.id;
    console.log(`Starting quiz for chat ${chatId}`);
    
    if (userStates.has(chatId)) {
        console.log(`Quiz already in progress for chat ${chatId}`);
        bot.sendMessage(
            chatId,
            "A quiz is already in progress. You can continue participating in the current quiz."
        );
        return;
    }
    
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
    
    userStates.set(chatId, {
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
        askNextQuestion(chatId, bot);
    } else {
        console.log(`No questions available for chat ${chatId}`);
        bot.sendMessage(chatId, "Error: No questions available for this round. Please try selecting a different round.");
        endQuiz(chatId, bot);
    }
};

// ... (rest of the file remains unchanged)

const stopQuiz = (msg, bot) => {
    const chatId = msg.chat.id;
    if (!userStates.has(chatId)) {
      bot.sendMessage(chatId, "There is no active quiz to stop.");
      return;
    } // Clear any pending timeouts and intervals
    const userState = userStates.get(chatId);
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

  const askNextQuestion = (chatId, bot) => {
    const userState = userStates.get(chatId);
    if (!userState) return;
    const { currentQuestionNumber } = userState;
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
      userStates.set(chatId, {
        ...userState,
        currentQuestionNumber: currentQuestionNumber + 1,
        answeredUsers: new Set(),
      });
    } else {
      bot.sendMessage(chatId, "No more questions available");
      endQuiz(chatId, bot);
    }
  };

  const askQuestion = async (chatId, question, bot) => {
    clearAnswers(chatId);
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
    const remainingTime = Math.floor(questionTimer / 1000);
    const messageText = `${question.question_text}\n\n\u{1F4A3} Time remaining: ${remainingTime} seconds`;
    const questionMessage = await bot.sendMessage(chatId, messageText, options);
    
    const timeout = setTimeout(() => evaluateAndProceed(chatId, question, bot), questionTimer);
    const timerInterval = setInterval(() => updateTimer(chatId, bot, questionMessage.message_id), 1000);
    
    const userState = userStates.get(chatId);
    userStates.set(chatId, { 
        ...userState, 
        timeout, 
        timerInterval, 
        questionMessageId: questionMessage.message_id, 
        startTime: Date.now(),
        currentQuestion: question.question_text,
        currentOptions: options.reply_markup
    });
};

const updateTimer = (chatId, bot, messageId) => {
    const userState = userStates.get(chatId);
    if (!userState) return;

    const elapsedTime = Math.floor((Date.now() - userState.startTime) / 1000);
    const remainingTime = Math.max(0, Math.floor(questionTimer / 1000) - elapsedTime);

    const messageText = `${userState.currentQuestion}\n\n${remainingTime > 0 ? '\u{1F4A3}' : '\u{1F4A5}'} Time remaining: ${remainingTime} seconds`;

    bot.editMessageText(messageText, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: userState.currentOptions
    }).catch(error => {
        console.error('Error updating timer message:', error);
    });

    if (remainingTime <= 0) {
        clearInterval(userState.timerInterval);
    }
};

const evaluateAndProceed = async (chatId, question, bot) => {
    const userState = userStates.get(chatId);
    if (!userState) {
      log(`Quiz stopped unexpectedly in chat ${chatId}`, chatId, "ERROR");
      return;
      // Quiz might have been stopped
    }
    clearInterval(userState.timerInterval);
    const correctUsers = evaluateAnswers(chatId, question);
    await revealAnswer(chatId, question, bot);
    await announceQuestionWinners(chatId, bot, correctUsers);
    log(
      `Ending question ${userState.currentQuestionNumber} in chat ${chatId}`,
      chatId,
      "QUESTION_END"
    );
    logQuestionResults(chatId, userState);
    askNextQuestion(chatId, bot);
  };
  
  const revealAnswer = async (chatId, question, bot) => {
    const correctAnswer = getCorrectAnswerText(question);
    await bot.sendMessage(chatId, `The correct answer is: ${correctAnswer}`);
  };

  const handleAnswerSelection = (callback_query, bot) => {
    const chatId = callback_query.message.chat.id;
    const userId = callback_query.from.id;
    const answer = callback_query.data;
    const userNickname =
      callback_query.from.username ||
      callback_query.from.first_name ||
      `User${userId}`;
    const userState = userStates.get(chatId);
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

  const evaluateAnswers = (chatId, question) => {
    const correctUsers = [];
    const correctAnswer = getCorrectAnswerIndex(question);
    const userAnswers = getUserAnswers(chatId);
    const userState = userStates.get(chatId);
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

  const endQuiz = async (chatId, bot) => {
    const userState = userStates.get(chatId);
    if (!userState) return;
    let finalScores = "Quiz ended! Final scores: \n";
    for (const [userId, userNickname] of userState.activeUsers) {
      const score = getUserScore(userId);
      finalScores += `${userNickname}: ${score} points`;
    }
    await bot.sendMessage(chatId, finalScores);
    log(`Quiz ended in chat ${chatId}. ${finalScores}`, chatId, "END");
    userStates.delete(chatId);
  };

module.exports = {
    startQuiz,
    stopQuiz,
    handleAnswerSelection,
    askNextQuestion,
    selectRound,
    getCurrentRound
};