const initialState = {
    isSignedIn: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isSignedIn: true,
                id: action.id,
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
        default:
            return {
                ...state
            };
    }
};

export default reducer;
