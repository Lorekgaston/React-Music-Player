import {
    FETCH_LISTOFPLAYLIST_FAILED,
    FETCH_LISTOFPLAYLIST_REQUESTED,
    FETCH_LISTOFPLAYLIST_SUCCEDED
} from '../actionTypes';

const initialState = {
    listOfPlaylist: null,
    isLoading: false,
    isError: false,
    errorMessage: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LISTOFPLAYLIST_REQUESTED:
            return {
                ...state,
                isLoading: action.loading
            };
        case FETCH_LISTOFPLAYLIST_SUCCEDED:
            console.log(action);
            return {
                ...state,
                listOfPlaylist: action.listOfPlaylist,
                isLoading: action.loading
            };
        case FETCH_LISTOFPLAYLIST_FAILED:
            return {
                ...state,
                isLoading: action.loading,
                isError: true,
                errorMessage: action.errorMessage
            };
        default:
            return state;
    }
};

export default reducer;
