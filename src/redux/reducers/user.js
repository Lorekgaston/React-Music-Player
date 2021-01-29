/* eslint-disable no-case-declarations */
import * as actionType from '../actionTypes';

const intialState = {
    user: {},
    loading: false,
    error: ''
};

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionType.SET_USER:
            const { user } = action;
            console.log(action);
            return {
                ...state,
                user
            };
        case actionType.GET_USER:
            return {
                ...state,
                loading: true
            };
        case actionType.SET_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default reducer;
