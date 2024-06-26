const round1 = require('../../../libraries/utils/round_1.json');
const round2 = require('../../../libraries/utils/round_2.json');
const round3 = require('../../../libraries/utils/round_3.json');

const rounds = [round1, round2, round3];
let currentRound = 0;

const getQuestion = (index) => {
    const totalQuestionsInPreviousRounds = rounds.slice(0, currentRound).reduce((sum, round) => sum + round.questions.length, 0);
    const adjustedIndex = index - totalQuestionsInPreviousRounds;

    while (currentRound < rounds.length) {
        if (adjustedIndex < rounds[currentRound].questions.length) {
            return {
                ...rounds[currentRound].questions[adjustedIndex],
                roundNumber: currentRound + 1
            };
        }
        currentRound++;
    }

    return null;
};

const getCorrectAnswerText = (question) => {
    return question.answers[question.correct_answer];
};

const getCorrectAnswerIndex = (question) => {
    return question.correct_answer;
};

const getTotalQuestions = () => {
    return rounds.reduce((sum, round) => sum + round.questions.length, 0);
};

const getCurrentRound = () => {
    return currentRound + 1;
};

const resetQuiz = () => {
    currentRound = 0;
};

module.exports = {
    getQuestion,
    getCorrectAnswerText,
    getCorrectAnswerIndex,
    getTotalQuestions,
    getCurrentRound,
    resetQuiz
};