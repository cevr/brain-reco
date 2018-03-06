export const logIn = ({ id, name, email }) => {
    return {
        type: 'LOGIN',
        id,
        name,
        email
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

export const setFaceRecognitionData = box => {
    return {
        type: 'SET_FACE_RECOGNITION_DATA',
        box
    };
};
