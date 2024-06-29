# Quiz Bot Test Documentation

This document provides an overview of the test suite for the Telegram Quiz Bot. The tests are designed to ensure the bot functions correctly across various scenarios and edge cases.

## Test Environment

- Testing Framework: Jest
- Test Files: 
  - `tests/quizController.test.js` (Unit tests)
  - `tests/integration.test.js` (Integration tests)

## Unit Tests (quizController.test.js)

### 1. startQuiz Function
- **Test**: Should start a new quiz when no quiz is in progress
  - Verifies that user scores are reset, quiz is reset, user state is set, and the first question is asked.
- **Test**: Should not start a new quiz when a quiz is already in progress
  - Ensures that an appropriate message is sent when attempting to start a quiz while one is already running.
- **Test**: Should handle the case when no round is selected
  - Checks that the bot prompts the user to select a round if none is currently selected.
- **Test**: Should handle the case when there are no questions in the selected round
  - Verifies that the bot sends an error message and ends the quiz if the selected round has no questions.

### 2. stopQuiz Function
- **Test**: Should stop an ongoing quiz
  - Ensures that timers are cleared, the quiz is ended, and a stop message is sent.
- **Test**: Should handle the case when no quiz is in progress
  - Checks that an appropriate message is sent when trying to stop a non-existent quiz.

### 3. handleAnswerSelection Function
- **Test**: Should process a valid answer selection
  - Verifies that the answer is recorded, the user is marked as having answered, and a confirmation message is sent.
- **Test**: Should not process an answer if the user has already answered
  - Ensures that duplicate answers from the same user are ignored.
- **Test**: Should handle errors gracefully
  - Checks that any errors during answer processing are caught and an error message is sent to the user.

### 4. selectRound Function
- **Test**: Should select a valid round
  - Verifies that a valid round can be selected successfully.
- **Test**: Should handle an invalid round selection
  - Ensures that an attempt to select an invalid round is handled appropriately.

### 5. getCurrentRound Function
- **Test**: Should return the current round
  - Checks that the function returns the correct currently selected round.
- **Test**: Should handle the case when no round is selected
  - Verifies that the function returns null when no round is currently selected.

## Integration Tests (integration.test.js)

### 1. Multiple Users in Multiple Channels
- **Test**: Simulates multiple users participating in quizzes across different channels simultaneously.
- Verifies that:
  - Quizzes can run concurrently in different channels.
  - The correct number of messages and interactions occur for each quiz.

### 2. Users Joining and Leaving Mid-Quiz
- **Test**: Simulates users joining and leaving a quiz at different points.
- Verifies that:
  - New users can join and participate in the quiz after it has started.
  - Users can leave the quiz without disrupting it for others.
  - The user state is correctly updated when users join or leave.
  - The correct number of answer messages are sent based on the number of active users for each question.

### 3. Different Rounds for Different Channels
- **Test**: Simulates different channels running quizzes with different rounds simultaneously.
- Verifies that:
  - Each channel can select and use a different round for its quiz.
  - The correct round is used for each channel's quiz.
  - Quiz start messages mention the correct round for each channel.

### 4. Quiz Scoring and Leaderboard Functionality
- **Test**: Simulates complete quizzes with predefined correct and incorrect answers to test scoring.
- Verifies that:
  - Scores are calculated correctly based on user answers.
  - Leaderboards are generated accurately at the end of each quiz.
  - Leaderboard messages contain the correct scores for each user.

### 5. Error Handling - Network Errors
- **Test**: Simulates network errors during bot operations.
- Verifies that:
  - The bot catches network errors and sends an appropriate error message to the user.
  - The error doesn't crash the bot or leave the quiz in an inconsistent state.

### 6. Error Handling - Invalid User Input
- **Test**: Simulates a user sending an invalid answer (e.g., a letter instead of a number).
- Verifies that:
  - The bot detects the invalid input and sends a message asking for a valid option.
  - The invalid input doesn't affect the quiz state or scoring.

### 7. Error Handling - Database Connection Failure
- **Test**: Simulates a database connection failure.
- Verifies that:
  - The bot gracefully handles database errors and sends an appropriate message to the user.
  - The error doesn't crash the bot or expose sensitive information.

### 8. Rate Limiting
- **Test**: Simulates a scenario where the rate limit is exceeded.
- Verifies that:
  - The bot detects when the rate limit is exceeded and sends an appropriate message.
  - The bot continues to function normally for other users and channels.

## Running the Tests

To run the tests, use the following command in the project root directory:

```
npm test
```

This will run all test files and provide a summary of the results.

## Continuous Integration

It is recommended to set up a CI pipeline (e.g., using GitHub Actions, GitLab CI, or Jenkins) to automatically run these tests on every push to the repository. This ensures that new changes do not break existing functionality.

## Future Test Considerations

1. End-to-end (E2E) tests simulating real bot-user interactions using a staging bot token and test chat.
2. Performance tests to ensure the bot can handle a large number of concurrent users and quizzes.
3. Tests for additional features as they are added to the bot (e.g., user registration, custom quiz creation, etc.).
4. More comprehensive error handling tests, including testing for various types of API errors from the Telegram Bot API.
5. Security tests to ensure the bot is not vulnerable to common attack vectors.
6. Localization tests if the bot supports multiple languages.