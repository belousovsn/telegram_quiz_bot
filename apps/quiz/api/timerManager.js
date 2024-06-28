const { questionTimer } = require('../../../libraries/utils/config');
const { getUserState, setUserState } = require('./userStateManager');

const updateTimer = (chatId, bot, messageId, totalQuestions) => {
    console.log('updateTimer calls')
    const userState = getUserState(chatId);
    if (!userState) return;

    const elapsedTime = Math.floor((Date.now() - userState.startTime) / 1000);
    const remainingTime = Math.max(0, Math.floor(questionTimer/ 1000) - elapsedTime);
        console.log('current remaining time, questionTimer, elapsedTime: ', remainingTime, questionTimer, elapsedTime)
    const messageText = `Question ${userState.currentQuestionNumber}/${totalQuestions}\n\n${userState.currentQuestion}${remainingTime > 0 ? `\n\n\u23F0 Time remaining: ${remainingTime} second${remainingTime !== 1 ? 's' : ''}` : ''}`;

    bot.editMessageText(messageText, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: userState.currentOptions
    }).catch(error => {
        console.error('Error updating timer message:', error);
    });

    // if (remainingTime <= 0) {
    //     clearInterval(userState.timerInterval);
    // }
    userState.counter += 1;
    if (userState.counter >= Math.floor(questionTimer/10)) {
        console.log('interval is cleared')
        clearInterval(userState.timerInterval);
    }
};

module.exports = {
    updateTimer
};