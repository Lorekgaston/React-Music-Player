import axios from 'axios';
import * as actionType from '../actionTypes';

export const setUser = user => {
    return {
        type: actionType.SET_USER,
        user
    };
};
export const getUser = () => {
    return {
        type: actionType.GET_USER
    };
};
export const setError = () => {
    return {
        type: actionType.SET_ERROR
    };
};
export const setToken = payload => {
    return {
        type: actionType.SET_TOKEN,
        payload
    };
};

export const fetchUser = token => {
    return async dispatch => {
        dispatch(getUser);
        try {
            const response = await axios.get(`https://api.spotify.com/v1/me`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            const { data } = response || {};
            dispatch(setUser(data));
        } catch (err) {
            const message = await err.message;
            dispatch(setError(message));
        }
    };
};
