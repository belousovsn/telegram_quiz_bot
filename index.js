const TelegramBot = require('node-telegram-bot-api')
const { startQuiz, handleAnswerSelection } = require('./apps/quiz/api/quizController')
const { botToken } = require ('./libraries/utils/config')
const token = botToken;
const bot = new TelegramBot(token, {polling: true});

//Handle the /start command
bot.onText(/\/start/, (msg) => startQuiz(msg, bot));

//Handle the /next command
bot.onText(/\/next/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Next not yet implemented')
})

//Handle the /stop command
bot.onText(/\/stop/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Stop message command not yet implemented')
})


//Handle answer selections
bot.on('callback_query', (callbackQuery) => handleAnswerSelection(callbackQuery, bot));


module.exports = bot;