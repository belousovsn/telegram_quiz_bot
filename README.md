# telegram_quiz_bot
Bot to play quizes in TG channels

In order to run this bot, you need to have Node installed. 

Run "npm install" to install all dependencies.

Create a config.js file in libraries/utils/ , inserting API token that you get from BotFather:

const botToken = '<insert Bot Token here>';
const questionTimer = 5000; //Time to answer each question
const totalQuestions = 30; // Adjust this number based on the total questions across all rounds

module.exports = {
    botToken,
    questionTimer,
    totalQuestions
}

Create at least one round in libraries/utils/round_1.json , Example:

{
    "questions": [
      {
        "question_text": "What is 2 + 3?",
        "answers": ["2", "3", "5", "4"],
        "correct_answer": 2
      }
    ]
}

Run "node .\index.js"
Start a dialog with the bot or add it to your channel with /start

