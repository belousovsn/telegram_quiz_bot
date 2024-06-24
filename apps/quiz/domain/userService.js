let userAnswers = {};

const recordAnswer = (userId, answer) => {
    userAnswers[userId] = answer;
    //debug
    console.log(userAnswers)
}

const getUserAnswers = () => {
    return userAnswers;
}

const clearAnswers = () => {
    userAnswers = [];
}

module.exports = {
    recordAnswer,
    getUserAnswers,
    clearAnswers
};