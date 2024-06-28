const TelegramBot = require('node-telegram-bot-api');
const { startQuiz, stopQuiz, handleAnswerSelection, selectRound, getCurrentRound } = require('./apps/quiz/api/quizController');
const { botToken } = require('./libraries/utils/config');

const token = botToken;
const bot = new TelegramBot(token, {polling: true});

// Handle the /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    console.log(`Received /start command from chat ${chatId}`);
    showMainMenu(chatId);
});

// Handle callback queries
bot.on('callback_query', (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;
    console.log(`Received callback query from chat ${chatId} with data: ${data}`);

    switch(data) {
        case 'start_round':
            const currentRound = getCurrentRound();
            console.log(`Current round for chat ${chatId}: ${currentRound}`);
            if (!currentRound) {
                console.log(`No round selected for chat ${chatId}`);
                bot.sendMessage(chatId, "Please select a round first using the 'Select Round' option.");
            } else {
                console.log(`Starting quiz for chat ${chatId} with round ${currentRound}`);
                startQuiz(callbackQuery.message, bot);
            }
            break;
        case 'stop_round':
            console.log(`Stopping quiz for chat ${chatId}`);
            stopQuiz(callbackQuery.message, bot);
            break;
        case 'select_round':
            console.log(`Showing round selection menu for chat ${chatId}`);
            showRoundSelectionMenu(chatId);
            break;
        case 'round_1':
        case 'round_2':
        case 'round_3':
            const roundNumber = parseInt(data.split('_')[1]);
            console.log(`Selecting round ${roundNumber} for chat ${chatId}`);
            if (selectRound(roundNumber)) {
                bot.sendMessage(chatId, `Round ${roundNumber} selected successfully.`);
            } else {
                bot.sendMessage(chatId, `Failed to select round ${roundNumber}. Please try again.`);
            }
            showMainMenu(chatId);
            break;
        case 'back_to_main':
            console.log(`Returning to main menu for chat ${chatId}`);
            showMainMenu(chatId);
            break;
        default:
            console.log(`Handling answer selection for chat ${chatId}`);
            handleAnswerSelection(callbackQuery, bot);
    }

    // Answer the callback query
    bot.answerCallbackQuery(callbackQuery.id);
});

function showMainMenu(chatId) {
    console.log(`Showing main menu for chat ${chatId}`);
    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Start Round', callback_data: 'start_round' }],
                [{ text: 'Stop Round', callback_data: 'stop_round' }],
                [{ text: 'Select Round', callback_data: 'select_round' }]
            ]
        }
    };
    bot.sendMessage(chatId, 'Welcome to the Quiz Bot! Please select an option:', options);
}

function showRoundSelectionMenu(chatId) {
    console.log(`Showing round selection menu for chat ${chatId}`);
    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Choose Round 1', callback_data: 'round_1' }],
                [{ text: 'Choose Round 2', callback_data: 'round_2' }],
                [{ text: 'Choose Round 3', callback_data: 'round_3' }],
                [{ text: 'Back', callback_data: 'back_to_main' }]
            ]
        }
    };
    bot.sendMessage(chatId, 'Select a round:', options);
}

// Error handling
bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
});

console.log('Bot is running...');

module.exports = bot;