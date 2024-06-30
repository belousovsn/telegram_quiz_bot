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
        bot.sendMessage = jest.fn();
        bot.answerCallbackQuery = jest.fn();
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
        const { askNextQuestion, endQuiz } = require('../apps/quiz/api/questionManager');
        const { evaluateAnswers, announceQuestionWinners } = require('../apps/quiz/api/scoreManager');

        getUserState.mockReturnValue(null);
        getCurrentRound.mockReturnValue(roundName);
        selectRound.mockReturnValue(true);
        getTotalQuestions.mockReturnValue(numQuestions);

        const startMsg = createMockMsg(chatId, users[0].id, users[0].username);
        await startQuiz(startMsg, bot);

        expect(bot.sendMessage).toHaveBeenCalledWith(
            chatId,
            expect.stringContaining(`A new quiz has started! Round: ${roundName}`),
            expect.any(Object)
        );

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

            await askNextQuestion(chatId, bot, getUserState(chatId));

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
        await stopQuiz(stopMsg, bot);

        expect(bot.sendMessage).toHaveBeenCalledWith(
            chatId,
            "The quiz has been stopped.",
            expect.any(Object)
        );
    };