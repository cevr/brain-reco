const initialState = {
    isSignedIn: false,
    box: [{}]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isSignedIn: true,
                id: action.id,
                email: action.email,
                name: action.name
            };

        case 'LOGOUT':
            return {
                ...state,
                isSignedIn: false
            };
        case 'SET_ENTRY_COUNT':
            return {
                ...state,
                entryCount: action.entryCount
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.error
            };
        case 'SET_FACE_RECOGNITION_DATA':
            return {
                ...state,
                box: action.box
            };
        default:
            return {
                ...state
            };
    }
};

export default reducer;
