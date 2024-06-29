// ... (previous code remains unchanged)

describe('Quiz Bot Integration Tests', () => {
    // ... (previous tests remain unchanged)

    test('Error handling - Network errors', async () => {
        const chatId = 100;
        const user = { id: 1, username: 'user1' };
        
        // Simulate a network error when sending a message
        bot.sendMessage.mockRejectedValueOnce(new Error('Network error'));

        await expect(startQuiz(createMockMsg(chatId, user.id, user.username), bot))
            .rejects.toThrow('Network error');

        expect(bot.sendMessage).toHaveBeenCalledWith(
            chatId,
            expect.stringContaining("Sorry, there was a network error. Please try again later."),
            expect.any(Object)
        );
    });

    test('Error handling - Invalid user input', async () => {
        const chatId = 100;
        const user = { id: 1, username: 'user1' };
        
        // Simulate an invalid answer (e.g., a letter instead of a number)
        const invalidCallbackQuery = createMockCallbackQuery(chatId, user.id, user.username, 1000, 'a');

        await handleAnswerSelection(invalidCallbackQuery, bot);

        expect(bot.sendMessage).toHaveBeenCalledWith(
            chatId,
            expect.stringContaining("Invalid answer. Please select a valid option."),
            expect.any(Object)
        );
    });

    test('Error handling - Database connection failure', async () => {
        const chatId = 100;
        const user = { id: 1, username: 'user1' };

        // Mock a database connection failure
        const { getUserState } = require('../apps/quiz/api/userStateManager');
        getUserState.mockImplementationOnce(() => {
            throw new Error('Database connection failed');
        });

        await startQuiz(createMockMsg(chatId, user.id, user.username), bot);

        expect(bot.sendMessage).toHaveBeenCalledWith(
            chatId,
            expect.stringContaining("Sorry, we're experiencing technical difficulties. Please try again later."),
            expect.any(Object)
        );
    });

    test('Rate limiting', async () => {
        const chatId = 100;
        const user = { id: 1, username: 'user1' };

        // Simulate rate limiting by rejecting messages after a certain number
        let messageCount = 0;
        bot.sendMessage.mockImplementation(() => {
            messageCount++;
            if (messageCount > 5) {
                throw new Error('Rate limit exceeded');
            }
            return Promise.resolve();
        });

        await simulateQuizFlow(chatId, [user], 10, 'round1');

        expect(bot.sendMessage).toHaveBeenCalledWith(
            chatId,
            expect.stringContaining("Rate limit exceeded. Please wait before sending more messages."),
            expect.any(Object)
        );
    });
});