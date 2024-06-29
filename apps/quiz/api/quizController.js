const { getTotalQuestions, resetQuiz } = require('../domain/quizService');
const { recordAnswer, clearAnswers, resetUserScores } = require('../domain/userService');
const { questionTimer } = require('../../../libraries/utils/config');
const { log } = require('./utils/logger');
const { selectRound, getCurrentRound } = require('./roundManager');
const { askNextQuestion, askQuestion, evaluateAndProceed, revealAnswer, endQuiz } = require('./questionManager');
const { updateTimer } = require('./timerManager');
const { evaluateAnswers, announceQuestionWinners, logQuestionResults } = require('./scoreManager');
const { getUserState, setUserState, deleteUserState } = require('./userStateManager');

const answerQueues = new Map();
const MAX_QUEUE_SIZE = 1000; // Adjust as needed
const QUEUE_PROCESSING_INTERVAL = 50; // milliseconds

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

const handleAnswerSelection = async (callbackQuery, bot) => {
    console.log('handleAnswerSelection called with callbackQuery:', JSON.stringify(callbackQuery, null, 2));
    
    try {
        if (!callbackQuery || typeof callbackQuery !== 'object') {
            throw new Error('Invalid callback query object');
        }
        
        const chatId = callbackQuery.message.chat.id;
        const userId = callbackQuery.from.id;
        const answer = callbackQuery.data;
        
        console.log(`Processing answer for chatId: ${chatId}, userId: ${userId}, answer: ${answer}`);
        
        // Acknowledge the callback query
        await bot.answerCallbackQuery(callbackQuery.id);
        
        // Get or create the queue for this chat
        if (!answerQueues.has(chatId)) {
            answerQueues.set(chatId, []);
            // Start processing for this chat's queue
            setImmediate(() => processAnswerQueue(chatId, bot));
        }

        const queue = answerQueues.get(chatId);

        // Add to queue if not full
        if (queue.length < MAX_QUEUE_SIZE) {
            queue.push({ userId, answer, callbackQuery });
        } else {
            console.warn(`Answer queue for chat ${chatId} is full. Discarding new answer.`);
        }
    } catch (error) {
        console.error('Error in handleAnswerSelection:', error);
        if (callbackQuery && callbackQuery.message) {
            bot.sendMessage(callbackQuery.message.chat.id, "Sorry, there was an error processing your answer. Please try again.");
        }
    }
};

const processAnswerQueue = async (chatId, bot) => {
    const queue = answerQueues.get(chatId);
    if (!queue || queue.length === 0) {
        answerQueues.delete(chatId);
        return;
    }

    const { userId, answer, callbackQuery } = queue.shift();
    
    try {
        const userState = getUserState(chatId);
        if (userState && !userState.answeredUsers.has(userId)) {
            const userNickname =
                callbackQuery.from.username ||
                callbackQuery.from.first_name ||
                `User${userId}`;

            log(
                `User ${userNickname} (${userId}) answered question ${userState.currentQuestionNumber}`,
                chatId,
                "ANSWER"
            );
            
            await recordAnswer(chatId, userId, answer);
            userState.answeredUsers.add(userId);
            userState.activeUsers.set(userId.toString(), userNickname);

            // Provide feedback to the user
            bot.sendMessage(chatId, `Answer received from ${userNickname}`, {
                reply_to_message_id: callbackQuery.message.message_id
            });
        }
    } catch (error) {
        console.error(`Error processing answer for chat ${chatId}, user ${userId}:`, error);
    }

    // Schedule next processing
    setTimeout(() => processAnswerQueue(chatId, bot), QUEUE_PROCESSING_INTERVAL);
};

module.exports = {
    startQuiz,
    stopQuiz,
    handleAnswerSelection,
    selectRound,
    getCurrentRound
};