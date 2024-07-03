const TelegramBot = require('node-telegram-bot-api');
const {
    startQuiz,
    stopQuiz,
    handleAnswerSelection,
    selectRound,
    getCurrentRound
} = require('../apps/quiz/api/quizController');

jest.mock('node-telegram-bot-api');
jest.mock('../apps/quiz/domain/quizService');
jest.mock('../apps/quiz/domain/userService');
jest.mock('../libraries/utils/config');
jest.mock('../apps/quiz/api/utils/logger');
jest.mock('../apps/quiz/api/roundManager');
jest.mock('../apps/quiz/api/questionManager');
jest.mock('../apps/quiz/api/timerManager');
jest.mock('../apps/quiz/api/scoreManager');
jest.mock('../apps/quiz/api/userStateManager');

describe('Quiz Bot Integration Tests', () => {
    let bot;

    beforeEach(() => {
        jest.resetAllMocks();
        bot = new TelegramBot('fake-token', { polling: false });
        bot.sendMessage = jest.fn().mockResolvedValue({});
        bot.answerCallbackQuery = jest.fn().mockResolvedValue({});
    });

    

    const createMockMsg = (chatId, userId, username) => ({
        chat: { id: chatId },
        from: { id: userId, username: username }
    });

    const createMockCallbackQuery = (chatId, userId, username, messageId, data) => ({
        id: `callbackQuery_${chatId}_${userId}`,
        from: { id: userId, username: username },
        message: { chat: { id: chatId }, message_id: messageId },
        data: data
    });

    const simulateQuizFlow = async (chatId, users, numQuestions, roundName, userActions = [], predefinedAnswers = null) => {
        const { getUserState, setUserState } = require('../apps/quiz/api/userStateManager');
        const { getCurrentRound, selectRound } = require('../apps/quiz/api/roundManager');
        const { getTotalQuestions, resetQuiz } = require('../apps/quiz/domain/quizService');
        const { resetUserScores, recordAnswer } = require('../apps/quiz/domain/userService');
        const { askNextQuestion, endQuiz, askQuestion } = require('../apps/quiz/api/questionManager');
        const { evaluateAnswers, announceQuestionWinners } = require('../apps/quiz/api/scoreManager');

        getUserState.mockReturnValue(null);
        getCurrentRound.mockReturnValue(roundName);
        selectRound.mockReturnValue(true);
        getTotalQuestions.mockReturnValue(numQuestions);

        const startMsg = createMockMsg(chatId, users[0].id, users[0].username);
        startQuiz(startMsg, bot);
        //expect.stringContaining(`A new quiz has started! Round: ${roundName}`),
        // expect(bot.sendMessage).toHaveBeenCalledWith(
        //     chatId,
        //     expect.stringContaining('Question'),
        //     expect.any(Object)
        // );

        for (let questionNum = 1; questionNum <= numQuestions; questionNum++) {
            const userState = { 
                currentQuestionNumber: questionNum,
                answeredUsers: new Set(),
                activeUsers: new Map(users.map(u => [u.id.toString(), u.username]))
            };
            getUserState.mockReturnValue(userState);

            expect(bot.sendMessage).toHaveBeenCalledWith(
                chatId,
                expect.stringContaining(`Question ${questionNum}/${numQuestions}`),
                expect.any(Object)
            );

            const currentActions = userActions.filter(action => action.questionNum === questionNum);
            for (const action of currentActions) {
                if (action.type === 'join') {
                    userState.activeUsers.set(action.user.id.toString(), action.user.username);
                } else if (action.type === 'leave') {
                    userState.activeUsers.delete(action.user.id.toString());
                }
            }

            for (const [userId, username] of userState.activeUsers) {
                const answer = predefinedAnswers ? predefinedAnswers[questionNum - 1][userId] : Math.floor(Math.random() * 4).toString();
                const callbackQuery = createMockCallbackQuery(chatId, parseInt(userId), username, 1000 + questionNum, answer);
                await handleAnswerSelection(callbackQuery, bot);

                expect(bot.sendMessage).toHaveBeenCalledWith(
                    chatId,
                    expect.stringContaining(`Answer received from ${username}`),
                    expect.any(Object)
                );
            }

            evaluateAnswers.mockImplementation(() => {
                const correctUsers = predefinedAnswers ? 
                    Object.entries(predefinedAnswers[questionNum - 1])
                        .filter(([userId, answer]) => answer === '0')
                        .map(([userId, _]) => parseInt(userId)) :
                    [];
                return { correctUserIds: correctUsers, correctAnswer: '0' };
            });

            askNextQuestion(chatId, bot, getUserState(chatId));

            expect(bot.sendMessage).toHaveBeenCalledWith(
                chatId,
                expect.stringContaining("The correct answer was"),
                expect.any(Object)
            );

            expect(announceQuestionWinners).toHaveBeenCalled();
        }

        getUserState.mockReturnValue({
            timeout: setTimeout(() => {}, 1000),
            timerInterval: setInterval(() => {}, 1000)
        });

        const stopMsg = createMockMsg(chatId, users[0].id, users[0].username);
        stopQuiz(stopMsg, bot);

        expect(bot.sendMessage).toHaveBeenCalledWith(
            chatId,
            "The quiz has been stopped.",
            expect.any(Object)
        );
    };

    // test('Mocking of bot.sendMessage is working', () => {
    //     const chatId = 100;
    //     const message = 'Test message';
    
    //     bot.sendMessage(chatId, message);
    
    //     expect(bot.sendMessage).toHaveBeenCalledWith(chatId, message);
    // });

    test('Multiple users in multiple channels with message content verification', async () => {
        const channels = [
            { id: 100, users: [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }] },
            { id: 200, users: [{ id: 3, username: 'user3' }, { id: 4, username: 'user4' }] },
        ];

        const numQuestions = 2;

        for (const channel of channels) {
            await simulateQuizFlow(channel.id, channel.users, numQuestions, 'round1');
        }

        // Log the number of calls to bot.sendMessage
        console.log('Number of calls to bot.sendMessage:', bot.sendMessage.mock.calls.length);

        // Log all calls to bot.sendMessage
        console.log('All calls to bot.sendMessage:', bot.sendMessage.mock.calls);

        const totalUsers = channels.reduce((sum, channel) => sum + channel.users.length, 0);
        const expectedInteractions = channels.length * (3 + numQuestions * (totalUsers / channels.length + 2));

        expect(bot.sendMessage).toHaveBeenCalledTimes(expectedInteractions);
        expect(bot.answerCallbackQuery).toHaveBeenCalledTimes(numQuestions * totalUsers);
    });

    // test('Users joining and leaving mid-quiz', async () => {
    //     const chatId = 100;
    //     const initialUsers = [
    //         { id: 1, username: 'user1' },
    //         { id: 2, username: 'user2' }
    //     ];
    //     const newUser = { id: 3, username: 'user3' };
    //     const numQuestions = 5;

    //     const userActions = [
    //         { type: 'join', user: newUser, questionNum: 2 },
    //         { type: 'leave', user: initialUsers[1], questionNum: 4 }
    //     ];

    //     await simulateQuizFlow(chatId, initialUsers, numQuestions, 'round1', userActions);

    //     const { getUserState } = require('../apps/quiz/api/userStateManager');
    //     const finalUserState = getUserState(chatId);

    //     expect(finalUserState.activeUsers.has('1')).toBe(true);
    //     expect(finalUserState.activeUsers.has('2')).toBe(false);
    //     expect(finalUserState.activeUsers.has('3')).toBe(true);

    //     const answerMessages = bot.sendMessage.mock.calls.filter(call => 
    //         call[1].includes("Answer received from")
    //     );
    //     expect(answerMessages.length).toBe(2 + 3 + 3 + 2 + 2);
    // });

    // test('Different rounds for different channels', async () => {
    //     const channels = [
    //         { id: 100, users: [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }], round: 'round1' },
    //         { id: 200, users: [{ id: 3, username: 'user3' }, { id: 4, username: 'user4' }], round: 'round2' },
    //         { id: 300, users: [{ id: 5, username: 'user5' }, { id: 6, username: 'user6' }], round: 'round3' }
    //     ];

    //     const numQuestions = 3;

    //     const { selectRound: selectRoundManager, getCurrentRound: getCurrentRoundManager } = require('../apps/quiz/api/roundManager');
        
    //     for (const channel of channels) {
    //         selectRoundManager.mockImplementation((roundName, chatId) => {
    //             expect(roundName).toBe(channel.round);
    //             expect(chatId).toBe(channel.id);
    //             return true;
    //         });

    //         getCurrentRoundManager.mockImplementation((chatId) => {
    //             expect(chatId).toBe(channel.id);
    //             return channel.round;
    //         });

    //         await simulateQuizFlow(channel.id, channel.users, numQuestions, channel.round);

    //         expect(selectRoundManager).toHaveBeenCalledWith(channel.round, channel.id);
    //         expect(getCurrentRoundManager).toHaveBeenCalledWith(channel.id);

    //         expect(bot.sendMessage).toHaveBeenCalledWith(
    //             channel.id,
    //             expect.stringContaining(`A new quiz has started! Round: ${channel.round}`),
    //             expect.any(Object)
    //         );
    //     }

    //     const totalUsers = channels.reduce((sum, channel) => sum + channel.users.length, 0);
    //     const totalInteractions = channels.length * (3 + numQuestions * (totalUsers / channels.length + 2));

    //     expect(bot.sendMessage).toHaveBeenCalledTimes(totalInteractions);
    //     expect(bot.answerCallbackQuery).toHaveBeenCalledTimes(numQuestions * totalUsers);
    // });
    // test('Quiz scoring and leaderboard functionality', async () => {
    //     const channels = [
    //         { 
    //             id: 100, 
    //             users: [
    //                 { id: 1, username: 'user1' }, 
    //                 { id: 2, username: 'user2' }
    //             ], 
    //             round: 'round1',
    //             predefinedAnswers: [
    //                 { '1': '0', '2': '1' },  // Question 1: user1 correct, user2 incorrect
    //                 { '1': '1', '2': '0' },  // Question 2: user1 incorrect, user2 correct
    //                 { '1': '0', '2': '0' },  // Question 3: both correct
    //             ]
    //         },
    //         { 
    //             id: 200, 
    //             users: [
    //                 { id: 3, username: 'user3' }, 
    //                 { id: 4, username: 'user4' }
    //             ], 
    //             round: 'round2',
    //             predefinedAnswers: [
    //                 { '3': '0', '4': '0' },  // Question 1: both correct
    //                 { '3': '1', '4': '1' },  // Question 2: both incorrect
    //                 { '3': '0', '4': '1' },  // Question 3: user3 correct, user4 incorrect
    //             ]
    //         }
    //     ];

    //     const numQuestions = 3;
    //     const { getLeaderboard } = require('../apps/quiz/api/scoreManager');

    //     for (const channel of channels) {
    //         await simulateQuizFlow(channel.id, channel.users, numQuestions, channel.round, [], channel.predefinedAnswers);

    //         getLeaderboard.mockImplementation(() => {
    //             if (channel.id === 100) {
    //                 return [
    //                     { userId: 1, username: 'user1', score: 2 },
    //                     { userId: 2, username: 'user2', score: 2 }
    //                 ];
    //             } else {
    //                 return [
    //                     { userId: 3, username: 'user3', score: 2 },
    //                     { userId: 4, username: 'user4', score: 1 }
    //                 ];
    //             }
    //         });

    //         expect(bot.sendMessage).toHaveBeenCalledWith(
    //             channel.id,
    //             expect.stringContaining("Final Leaderboard"),
    //             expect.any(Object)
    //         );

    //         const leaderboardCall = bot.sendMessage.mock.calls.find(call => 
    //             call[0] === channel.id && call[1].includes("Final Leaderboard")
    //         );

    //         if (channel.id === 100) {
    //             expect(leaderboardCall[1]).toContain("user1: 2");
    //             expect(leaderboardCall[1]).toContain("user2: 2");
    //         } else {
    //             expect(leaderboardCall[1]).toContain("user3: 2");
    //             expect(leaderboardCall[1]).toContain("user4: 1");
    //         }
    //     }
    // });

    // // test('Error handling - Network errors', async () => {
    // //     const chatId = 100;
    // //     const user = { id: 1, username: 'user1' };
        
    // //     // Simulate a network error when sending a message
    // //     bot.sendMessage.mockRejectedValueOnce(new Error('Network error'));

    // //     // We expect startQuiz to catch the error and send an error message
    // //     await startQuiz(createMockMsg(chatId, user.id, user.username), bot);

    // //     // Check if the error message was sent to the user
    // //     expect(bot.sendMessage).toHaveBeenCalledWith(
    // //         chatId,
    // //         expect.stringContaining("Sorry, there was a network error. Please try again later."),
    // //         expect.any(Object)
    // //     );
    // // });

    // test('Error handling - Invalid user input', async () => {
    //     const chatId = 100;
    //     const user = { id: 1, username: 'user1' };
        
    //     const invalidCallbackQuery = createMockCallbackQuery(chatId, user.id, user.username, 1000, 'a');

    //     await handleAnswerSelection(invalidCallbackQuery, bot);

    //     expect(bot.sendMessage).toHaveBeenCalledWith(
    //         chatId,
    //         expect.stringContaining("Invalid answer. Please select a valid option."),
    //         expect.any(Object)
    //     );
    // });

    // // test('Error handling - Database connection failure', async () => {
    // //     const chatId = 100;
    // //     const user = { id: 1, username: 'user1' };

    // //     const { getUserState } = require('../apps/quiz/api/userStateManager');
    // //     getUserState.mockImplementationOnce(() => {
    // //         throw new Error('Database connection failed');
    // //     });

    // //     await startQuiz(createMockMsg(chatId, user.id, user.username), bot);

    // //     expect(bot.sendMessage).toHaveBeenCalledWith(
    // //         chatId,
    // //         expect.stringContaining("Sorry, we're experiencing technical difficulties. Please try again later."),
    // //         expect.any(Object)
    // //     );
    // // });

    // test('Rate limiting', async () => {
    //     const chatId = 100;
    //     const user = { id: 1, username: 'user1' };

    //     let messageCount = 0;
    //     bot.sendMessage.mockImplementation(() => {
    //         messageCount++;
    //         if (messageCount > 5) {
    //             throw new Error('Rate limit exceeded');
    //         }
    //         return Promise.resolve();
    //     });

    //     await simulateQuizFlow(chatId, [user], 10, 'round1');

    //     expect(bot.sendMessage).toHaveBeenCalledWith(
    //         chatId,
    //         expect.stringContaining("Rate limit exceeded. Please wait before sending more messages."),
    //         expect.any(Object)
    //     );
    // });
});