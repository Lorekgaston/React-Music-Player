import * as actionType from '../actionTypes';

const intialState = {
    categories: [],
    isLoading: false,
    error: false,
    errorMessage: ''
};

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionType.FETCH_CATEGORIES_REQUESTED:
            return {
                ...state,
                isLoading: action.loading
            };
        case actionType.FETCH_CATEGORIES_SUCCEDED:
            console.log(action.category);
            return {
                ...state,
                categories: action.category,
                isLoading: false
            };
        case actionType.FETCH_CATEGORIES_FAILED:
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
