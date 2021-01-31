import axios from 'axios';
import * as actionType from '../actionTypes';

const fetchCategoriesRequest = () => {
    return {
        type: actionType.FETCH_CATEGORIES_REQUESTED
    };
};
const fetchCategoriesSuccess = category => {
    return {
        type: actionType.FETCH_CATEGORIES_SUCCEDED,
        category
    };
};
const fetchCategoriesFailure = error => {
    return {
        type: actionType.FETCH_CATEGORIES_FAILED,
        error
    };
};

export const fetchCategories = token => {
    return async dispatch => {
        dispatch(fetchCategoriesRequest);
        try {
            const response = await axios.get(``, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            const { data: { categories: { items } = {} } = {} } = response || {};
            dispatch(fetchCategoriesSuccess(items));
        } catch (err) {
            const message = await err.message;
            dispatch(fetchCategoriesFailure(message));
        }
    };
};
