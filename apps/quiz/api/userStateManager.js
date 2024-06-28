const userStates = new Map();

const getUserState = (chatId) => {
    //console.log('GET USER STATE')
    //console.log(userStates)
    return userStates.get(chatId);
    
};

const setUserState = (chatId, state) => {
    //console.log('SET USER STATE')
    userStates.set(chatId, state);
    //console.log(userStates)
};

const deleteUserState = (chatId) => {
    userStates.delete(chatId);
};

module.exports = {
    getUserState,
    setUserState,
    deleteUserState
};