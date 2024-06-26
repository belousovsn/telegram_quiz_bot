const TelegramBot = require('node-telegram-bot-api');
const { startQuiz, stopQuiz, handleAnswerSelection } = require('./apps/quiz/api/quizController');
const { botToken } = require('./libraries/utils/config');

const token = botToken;
const bot = new TelegramBot(token, {polling: true});

// Handle the /start command
bot.onText(/\/start/, (msg) => {
    startQuiz(msg, bot);
});

// Handle the /stop command
bot.onText(/\/stop/, (msg) => {
    stopQuiz(msg, bot);
});

// Handle answer selections
bot.on('callback_query', (callbackQuery) => {
    handleAnswerSelection(callbackQuery, bot);
});

// Error handling
bot.on('polling_error', (error) => {
    console.log('Polling error:', error);
});

console.log('Bot is running...');

module.exports = bot;