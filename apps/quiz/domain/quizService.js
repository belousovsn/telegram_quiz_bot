const questionsRound = require('../../../libraries/utils/round_1.json')

const getQuestion = (index) => {
    if (index < questionsRound.questions.length) {
        return questionsRound.questions[index];
    }
    else {
        return null;
    }
};

const getCorrectAnswerText = (question) => {
    //returns text of correct answer
    //correct_answer stores index of answers array
    return question.answers[question.correct_answer]
};

const getCorrectAnswerIndex = (question) => {
    //returns data of correct answer
    return question.correct_answer;
}

const getNextQuestion = (index) => {
    return getQuestion(index + 1);
}

module.exports = {
    getQuestion,
    getCorrectAnswerText,
    getNextQuestion,
    getCorrectAnswerIndex
}