import {
    FETCH_PLAYLIST_REQUESTED,
    FETCH_PLAYLIST_SUCCEDED,
    FETCH_PLAYLIST_FAILED
} from '../actionTypes';

const initialState = {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PLAYLIST_REQUESTED:
            return {
                ...state,
                isLoading: action.loading
            };
        case FETCH_PLAYLIST_SUCCEDED:
            return {
                ...state,
                data: action.tracks,
                isLoading: false
            };
        case FETCH_PLAYLIST_FAILED:
            return {
                ...state,
                isError: true,
                errorMessage: action.errorMessage,
                isLoading: false
            };
        default:
            return state;
    }
};

export default reducer;
