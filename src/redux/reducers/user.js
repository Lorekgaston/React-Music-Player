/* eslint-disable no-case-declarations */
import * as actionType from '../actionTypes';

const intialState = {
    user: {},
    loading: false,
    isError: false,
    errorMessage: ''
};

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionType.SET_USER:
            const { user } = action;
            console.log(action);
            return {
                ...state,
                user,
                isError: false
            };
        case actionType.GET_USER:
            return {
                ...state,
                loading: true
            };
        case actionType.SET_ERROR:
            return {
                ...state,
                isError: true,
                errorMessage: action.payload
            };
        default:
            return state;
    }
};

export default reducer;
