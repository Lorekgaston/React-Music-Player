import axios from 'axios';
import * as actionType from '../actionTypes';

export const searchPlaylist = playlist => {
    return {
        type: actionType.SEARCH_PLAYLIST,
        playlist
    };
};
export const setLoading = () => {
    return {
        type: actionType.SET_LOADING
    };
};
export const setError = payload => {
    return {
        type: actionType.SET_ERROR,
        payload
    };
};

export const fetchPlaylist = (string, token) => {
    return async dispatch => {
        dispatch(setLoading);
        try {
            const response = await axios.get(
                `https://api.spotify.com/v1/search?q=${string}&type=playlist,track&limit=30`,
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }
            );
            console.log(response);
            const { data: { playlists: { items } = {}, tracks } = {} } = response;
            dispatch(searchPlaylist({ items, tracks, string }));
        } catch (err) {
            const message = await err.message;
            dispatch(setError(message));
        }
    };
};
