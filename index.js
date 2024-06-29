const TelegramBot = require('node-telegram-bot-api');
const { startQuiz, stopQuiz, handleAnswerSelection, selectRound, getCurrentRound } = require('./apps/quiz/api/quizController');
const { botToken } = require('./libraries/utils/config');

const token = botToken;
const bot = new TelegramBot(token, { polling: true });

// Main menu keyboard
const mainMenuKeyboard = {
    reply_markup: {
        keyboard: [
            ['Start Round'],
            ['Stop Round'],
            ['Select Round']
        ],
        resize_keyboard: true,
        one_time_keyboard: false
    }
};

// Round selection keyboard
const roundSelectionKeyboard = {
    reply_markup: {
        keyboard: [
            ['Round 1', 'Round 2', 'Round 3'],
            ['Back to Main Menu']
        ],
        resize_keyboard: true,
        one_time_keyboard: false
    }
};

// Handle the /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    console.log(`Received /start command from chat ${chatId}`);
    bot.sendMessage(chatId, 'Welcome to the Quiz Bot! Please use the keyboard to navigate.', mainMenuKeyboard);
});

// Handle messages
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    switch(messageText) {
        case 'Start Round':
            const currentRound = getCurrentRound();
            console.log(`Current round for chat ${chatId}: ${currentRound}`);
            if (!currentRound) {
                console.log(`No round selected for chat ${chatId}`);
                bot.sendMessage(chatId, "Please select a round first using the 'Select Round' option.", mainMenuKeyboard);
            } else {
                console.log(`Starting quiz for chat ${chatId} with round ${currentRound}`);
                startQuiz(msg, bot);
            }
            break;
        case 'Stop Round':
            console.log(`Stopping quiz for chat ${chatId}`);
            stopQuiz(msg, bot);
            break;
        case 'Select Round':
            console.log(`Showing round selection menu for chat ${chatId}`);
            bot.sendMessage(chatId, 'Select a round:', roundSelectionKeyboard);
            break;
        case 'Round 1':
        case 'Round 2':
        case 'Round 3':
            const roundNumber = parseInt(messageText.split(' ')[1]);
            console.log(`Selecting round ${roundNumber} for chat ${chatId}`);
            if (selectRound(roundNumber)) {
                bot.sendMessage(chatId, `Round ${roundNumber} selected successfully. You can now start the round.`, mainMenuKeyboard);
            } else {
                bot.sendMessage(chatId, `Failed to select round ${roundNumber}. Please try again.`, roundSelectionKeyboard);
            }
            break;
        case 'Back to Main Menu':
            bot.sendMessage(chatId, 'Returning to main menu.', mainMenuKeyboard);
            break;
        default:
            // Handle quiz answers here
            console.log(`Handling potential quiz answer for chat ${chatId}`);
            await handleAnswerSelection({ message: msg, data: messageText }, bot);
    }
});

// Handle callback queries
bot.on('callback_query', async (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    console.log(`Received callback query from chat ${chatId}`);

    try {
        await handleAnswerSelection(callbackQuery, bot);
        // Answer the callback query to prevent the "query is too old" error
        await bot.answerCallbackQuery(callbackQuery.id);
    } catch (error) {
        console.error('Error handling callback query:', error);
        // Still try to answer the callback query even if there was an error
        await bot.answerCallbackQuery(callbackQuery.id, { text: "An error occurred" });
    }
});

// Error handling
bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
});

console.log('Bot is running...');
module.exports = bot;