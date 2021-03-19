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
        const requests = [
            `https://api.spotify.com/v1/browse/categories?limit=50&offset=0`,
            `https://api.spotify.com/v1/browse/categories?limit=50&offset=50`
        ].map(url =>
            axios
                .get(url, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                })
                .catch(err => dispatch(fetchCategoriesFailure(err.message)))
        );
        try {
            const response = await axios.all(requests);
            dispatch(fetchCategoriesSuccess(response));
        } catch (err) {
            const message = await err.message;
            dispatch(fetchCategoriesFailure(message));
        }
    };
};
