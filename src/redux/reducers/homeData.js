import * as actionType from '../actionTypes';

const initialState = {
    recentlyPlayed: null,
    featuredPlaylists: null,
    recommendations: null,
    isLoading: false,
    isError: false,
    errorMessage: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.FETCH_HOME_REQUESTED:
            return {
                ...state,
                isLoading: action.loading
            };
        case actionType.FETCH_HOME_SUCCEDED:
            return {
                ...state,
                recentlyPlayed: action.data.responseOne,
                featuredPlaylists: action.data.responseTwo,
                recommendations: action.data.responseThree,
                isLoading: false,
                isError: false
            };
        case actionType.FETCH_HOME_FAILED:
            return {
                ...state,
                isError: true,
                errorMessage: action.message,
                isLoading: false
            };
        default:
            return state;
    }
};

export default reducer;
