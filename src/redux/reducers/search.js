import * as actionType from '../actionTypes';

const intialState = {
    playilist: [],
    loading: false,
    error: ''
};

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionType.SEARCH_PLAYLIST:
            console.log(action);
            return {
                ...state,
                playlist: action.playlist,
                loading: false
            };
        case actionType.SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case actionType.SET_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default reducer;
