const fs = require('fs');
const path = require('path');

function ensureLogDirectory(chatId) {
    const date = new Date().toISOString().split('T')[0];
    const logDir = path.join(__dirname, 'logs', date, chatId.toString());
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
    return logDir;
}

function getLogFilePath(chatId) {
    const date = new Date().toISOString().split('T')[0];
    const logDir = ensureLogDirectory(chatId);
    return path.join(logDir, `log.txt`);
}

function log(message, chatId, type = 'INFO') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${type}] ${message}`;

    // Log to console
    console.log(logMessage);

    // Log to file
    const logFilePath = getLogFilePath(chatId);
    fs.appendFileSync(logFilePath, logMessage + '\n');
}

module.exports = { log };