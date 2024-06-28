const round1 = require('../../../libraries/utils/round_1.json');
const round2 = require('../../../libraries/utils/round_2.json');
const round3 = require('../../../libraries/utils/round_3.json');

const rounds = [round1, round2, round3];
let currentRound = null;
let currentQuestions = [];

const loadRound = (roundNumber) => {
    console.log(`Attempting to load round ${roundNumber}`);
    if (roundNumber < 1 || roundNumber > rounds.length) {
        console.error(`Invalid round number: ${roundNumber}`);
        throw new Error(`Invalid round number. Please choose a round between 1 and ${rounds.length}.`);
    }
    currentRound = roundNumber - 1;
    currentQuestions = [...rounds[currentRound].questions];
    console.log(`Round ${roundNumber} loaded. Total questions: ${currentQuestions.length}`);
};

const getQuestion = (index) => {
    console.log(`Fetching question at index ${index}. Current round: ${currentRound}, Total questions: ${currentQuestions.length}`);
    if (currentRound === null || index >= currentQuestions.length) {
        console.log(`No question available at index ${index}`);
        return null;
    }
    return {
        ...currentQuestions[index],
        roundNumber: currentRound + 1
    };
};

const getCorrectAnswerText = (question) => {
    return question.answers[question.correct_answer];
};

const getCorrectAnswerIndex = (question) => {
    return question.correct_answer;
};

const getTotalQuestions = () => {
    console.log(`Getting total questions. Current count: ${currentQuestions.length}`);
    return currentQuestions.length;
};

const getCurrentRound = () => {
    console.log(`Getting current round: ${currentRound !== null ? currentRound + 1 : null}`);
    return currentRound !== null ? currentRound + 1 : null;
};

const resetQuiz = () => {
    console.log('Resetting quiz. Note: This does not clear the selected round.');
    // We no longer reset currentRound here
    currentQuestions = [];
};

module.exports = {
    getQuestion,
    getCorrectAnswerText,
    getCorrectAnswerIndex,
    getTotalQuestions,
    getCurrentRound,
    resetQuiz,
    loadRound
};