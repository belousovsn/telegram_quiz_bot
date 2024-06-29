const {
    startQuiz,
    stopQuiz,
    handleAnswerSelection,
    selectRound,
    getCurrentRound
} = require('../apps/quiz/api/quizController');

// Mock dependencies
jest.mock('../apps/quiz/domain/quizService');
jest.mock('../apps/quiz/domain/userService');
jest.mock('../libraries/utils/config');
jest.mock('./utils/logger');
jest.mock('./roundManager');
jest.mock('./questionManager');
jest.mock('./timerManager');
jest.mock('./scoreManager');
jest.mock('./userStateManager');

describe('Quiz Controller', () => {
    let mockBot;
    let mockMsg;
    let mockCallbackQuery;

    beforeEach(() => {
        // Reset all mocks before each test
        jest.resetAllMocks();

        // Create a mock bot object
        mockBot = {
            sendMessage: jest.fn(),
            answerCallbackQuery: jest.fn()
        };

        // Create a mock message object
        mockMsg = {
            chat: {
                id: 123456
            },
            from: {
                id: 789012,
                username: 'testuser'
            }
        };

        // Create a mock callback query object
        mockCallbackQuery = {
            id: 'callbackQueryId',
            from: {
                id: 789012,
                username: 'testuser'
            },
            message: {
                chat: {
                    id: 123456
                },
                message_id: 98765
            },
            data: '2'  // Assuming '2' is a valid answer option
        };
    });

    describe('startQuiz', () => {
        it('should start a new quiz when no quiz is in progress', () => {
            const { getUserState, setUserState } = require('./userStateManager');
            const { getCurrentRound, selectRound } = require('./roundManager');
            const { getTotalQuestions, resetQuiz } = require('../apps/quiz/domain/quizService');
            const { resetUserScores } = require('../apps/quiz/domain/userService');
            const { askNextQuestion } = require('./questionManager');

            getUserState.mockReturnValue(null);
            getCurrentRound.mockReturnValue('round1');
            selectRound.mockReturnValue(true);
            getTotalQuestions.mockReturnValue(5);

            startQuiz(mockMsg, mockBot);

            expect(resetUserScores).toHaveBeenCalled();
            expect(resetQuiz).toHaveBeenCalled();
            expect(setUserState).toHaveBeenCalledWith(123456, expect.any(Object));
            expect(askNextQuestion).toHaveBeenCalledWith(123456, mockBot, expect.any(Object));
        });

        it('should not start a new quiz when a quiz is already in progress', () => {
            const { getUserState } = require('./userStateManager');
            getUserState.mockReturnValue({ currentQuestionNumber: 1 });

            startQuiz(mockMsg, mockBot);

            expect(mockBot.sendMessage).toHaveBeenCalledWith(
                123456,
                expect.stringContaining("A quiz is already in progress")
            );
        });

        it('should handle the case when no round is selected', () => {
            const { getUserState } = require('./userStateManager');
            const { getCurrentRound } = require('./roundManager');

            getUserState.mockReturnValue(null);
            getCurrentRound.mockReturnValue(null);

            startQuiz(mockMsg, mockBot);

            expect(mockBot.sendMessage).toHaveBeenCalledWith(
                123456,
                expect.stringContaining("Please select a round first")
            );
        });

        it('should handle the case when there are no questions in the selected round', () => {
            const { getUserState, setUserState } = require('./userStateManager');
            const { getCurrentRound, selectRound } = require('./roundManager');
            const { getTotalQuestions, resetQuiz } = require('../apps/quiz/domain/quizService');
            const { resetUserScores } = require('../apps/quiz/domain/userService');
            const { endQuiz } = require('./questionManager');

            getUserState.mockReturnValue(null);
            getCurrentRound.mockReturnValue('round1');
            selectRound.mockReturnValue(true);
            getTotalQuestions.mockReturnValue(0);

            startQuiz(mockMsg, mockBot);

            expect(resetUserScores).toHaveBeenCalled();
            expect(resetQuiz).toHaveBeenCalled();
            expect(setUserState).toHaveBeenCalledWith(123456, expect.any(Object));
            expect(mockBot.sendMessage).toHaveBeenCalledWith(
                123456,
                expect.stringContaining("Error: No questions available for this round")
            );
            expect(endQuiz).toHaveBeenCalledWith(123456, mockBot);
        });
    });

    describe('stopQuiz', () => {
        it('should stop an ongoing quiz', () => {
            const { getUserState, deleteUserState } = require('./userStateManager');
            const { endQuiz } = require('./questionManager');

            getUserState.mockReturnValue({
                timeout: setTimeout(() => {}, 1000),
                timerInterval: setInterval(() => {}, 1000)
            });

            stopQuiz(mockMsg, mockBot);

            expect(endQuiz).toHaveBeenCalledWith(123456, mockBot);
            expect(mockBot.sendMessage).toHaveBeenCalledWith(
                123456,
                "The quiz has been stopped."
            );
        });

        it('should handle the case when no quiz is in progress', () => {
            const { getUserState } = require('./userStateManager');
            getUserState.mockReturnValue(null);

            stopQuiz(mockMsg, mockBot);

            expect(mockBot.sendMessage).toHaveBeenCalledWith(
                123456,
                "There is no active quiz to stop."
            );
        });
    });

    describe('handleAnswerSelection', () => {
        it('should process a valid answer selection', async () => {
            const { getUserState } = require('./userStateManager');
            const { recordAnswer } = require('../apps/quiz/domain/userService');

            getUserState.mockReturnValue({ 
                currentQuestionNumber: 1,
                answeredUsers: new Set(),
                activeUsers: new Map()
            });

            await handleAnswerSelection(mockCallbackQuery, mockBot);

            expect(mockBot.answerCallbackQuery).toHaveBeenCalledWith('callbackQueryId');
            expect(recordAnswer).toHaveBeenCalledWith(123456, 789012, '2');
            expect(mockBot.sendMessage).toHaveBeenCalledWith(
                123456,
                expect.stringContaining("Answer received from testuser"),
                expect.any(Object)
            );
        });

        it('should not process an answer if the user has already answered', async () => {
            const { getUserState } = require('./userStateManager');
            const { recordAnswer } = require('../apps/quiz/domain/userService');

            getUserState.mockReturnValue({ 
                currentQuestionNumber: 1,
                answeredUsers: new Set([789012]),
                activeUsers: new Map()
            });

            await handleAnswerSelection(mockCallbackQuery, mockBot);

            expect(mockBot.answerCallbackQuery).toHaveBeenCalledWith('callbackQueryId');
            expect(recordAnswer).not.toHaveBeenCalled();
            expect(mockBot.sendMessage).not.toHaveBeenCalled();
        });

        it('should handle errors gracefully', async () => {
            const { getUserState } = require('./userStateManager');
            getUserState.mockImplementation(() => {
                throw new Error('Test error');
            });

            await handleAnswerSelection(mockCallbackQuery, mockBot);

            expect(mockBot.answerCallbackQuery).toHaveBeenCalledWith('callbackQueryId');
            expect(mockBot.sendMessage).toHaveBeenCalledWith(
                123456,
                expect.stringContaining("Sorry, there was an error processing your answer")
            );
        });
    });

    describe('selectRound', () => {
        it('should select a valid round', () => {
            const { selectRound: selectRoundManager } = require('./roundManager');
            selectRoundManager.mockReturnValue(true);

            const result = selectRound('round1');

            expect(result).toBe(true);
            expect(selectRoundManager).toHaveBeenCalledWith('round1');
        });

        it('should handle an invalid round selection', () => {
            const { selectRound: selectRoundManager } = require('./roundManager');
            selectRoundManager.mockReturnValue(false);

            const result = selectRound('invalidRound');

            expect(result).toBe(false);
            expect(selectRoundManager).toHaveBeenCalledWith('invalidRound');
        });
    });

    describe('getCurrentRound', () => {
        it('should return the current round', () => {
            const { getCurrentRound: getCurrentRoundManager } = require('./roundManager');
            getCurrentRoundManager.mockReturnValue('round1');

            const result = getCurrentRound();

            expect(result).toBe('round1');
            expect(getCurrentRoundManager).toHaveBeenCalled();
        });

        it('should handle the case when no round is selected', () => {
            const { getCurrentRound: getCurrentRoundManager } = require('./roundManager');
            getCurrentRoundManager.mockReturnValue(null);

            const result = getCurrentRound();

            expect(result).toBeNull();
            expect(getCurrentRoundManager).toHaveBeenCalled();
        });
    });
});