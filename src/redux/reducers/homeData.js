import * as actionType from '../actionTypes';

const initialState = {
    recentlyPlayed: null,
    featuredPlaylists: null,
    recommendations: null,
    isLoading: false,
    error: false,
    errorMessage: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.FETCH_HOME_REQUESTED:
            return {
                ...state,
                isLoading: true
            };
        case actionType.FETCH_HOME_SUCCEDED:
            console.log(action);
            return {
                ...state,
                recentlyPlayed: action.data.responseOne,
                featuredPlaylists: action.data.responseTwo,
                recommendations: action.data.responseThree,
                isLoading: false
            };
        case actionType.FETCH_HOME_FAILED:
            return {
                ...state,
                error: true,
                errorMessage: action.message,
                isLoading: false
            };
        default:
            return state;
    }
};

export default reducer;
