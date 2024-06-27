const userStates = new Map();

const getUserState = (chatId) => {
    return userStates.get(chatId);
};

const setUserState = (chatId, state) => {
    userStates.set(chatId, state);
};

const deleteUserState = (chatId) => {
    userStates.delete(chatId);
};

module.exports = {
    getUserState,
    setUserState,
    deleteUserState
};