import axios from 'axios';
import * as actionType from '../actionTypes';

const fetchCategoriesRequest = loading => {
    return {
        type: actionType.FETCH_CATEGORIES_REQUESTED,
        loading
    };
};
const fetchCategoriesSuccess = category => {
    return {
        type: actionType.FETCH_CATEGORIES_SUCCEDED,
        category
    };
};
const fetchCategoriesFailure = message => {
    return {
        type: actionType.FETCH_CATEGORIES_FAILED,
        message
    };
};

export const fetchCategories = token => {
    return async dispatch => {
        dispatch(fetchCategoriesRequest(true));
        try {
            const response = await axios.get(
                `https://api.spotify.com/v1/browse/categories?offset=0&limit=50`,
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }
            );
            const { data: { categories: { items } = {} } = {} } = response || {};
            dispatch(fetchCategoriesSuccess(items));
        } catch (err) {
            const message = await err.message;
            dispatch(fetchCategoriesFailure(message));
        }
    };
};
