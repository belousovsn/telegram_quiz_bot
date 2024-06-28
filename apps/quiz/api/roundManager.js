const { loadRound } = require('../domain/quizService');

let currentRound = null;

const selectRound = (roundNumber) => {
    console.log(`Selecting round ${roundNumber}`);
    try {
        loadRound(roundNumber);
        currentRound = roundNumber;
        console.log(`Round ${roundNumber} successfully selected and loaded.`);
        return true;
    } catch (error) {
        console.error(`Error selecting round ${roundNumber}:`, error.message);
        return false;
    }
};

const getCurrentRound = () => {
    console.log(`Current round: ${currentRound}`);
    return currentRound;
};

module.exports = {
    selectRound,
    getCurrentRound
};