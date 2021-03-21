import * as actionType from '../actionTypes';

const intialState = {
    playlist: [],
    tracks: null,
    value: '',
    loading: false,
    isError: false,
    errorMessage: ''
};

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionType.SEARCH_PLAYLIST:
            console.log(action);
            return {
                ...state,
                playlist: action.playlist.items,
                tracks: action.playlist.tracks?.items,
                value: action.playlist.string,
                loading: false,
                isError: false
            };
        case actionType.SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case actionType.SET_ERROR:
            return {
                ...state,
                isError: true,
                loading: false,
                errorMessage: action.payload
            };
        default:
            return state;
    }
};

export default reducer;
