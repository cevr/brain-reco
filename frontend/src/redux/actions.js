export const logIn = ({ id, name }) => {
    return {
        type: 'LOGIN',
        id,
        name
    };
};

export const logOut = () => {
    return {
        type: 'LOGOUT'
    };
};

export const setEntryCount = entryCount => {
    return {
        type: 'SET_ENTRY_COUNT',
        entryCount
    };
};

export const setError = error => {
    return {
        type: 'SET_ERROR',
        error
    };
};
