import axios from 'axios';
import * as actionType from '../actionTypes';
import { getAuthToken } from '../../Auth';

const { access_token } = getAuthToken();

const fetchListOfPlaylistDataRequested = loading => {
    return {
        type: actionType.FETCH_LISTOFPLAYLIST_REQUESTED,
        loading
    };
};
const fetchListOfPlaylistDataSucceded = listOfPlaylist => {
    return {
        type: actionType.FETCH_LISTOFPLAYLIST_SUCCEDED,
        listOfPlaylist
    };
};
const fetchListOfPlaylistDataFailure = errorMessage => {
    return {
        type: actionType.FETCH_LISTOFPLAYLIST_FAILED,
        errorMessage
    };
};

export const fetchListOfPlaylistData = id => {
    return async dispatch => {
        dispatch(fetchListOfPlaylistDataRequested(true));
        try {
            const listOfPlaylist = await axios.get(
                `https://api.spotify.com/v1/browse/categories/${id}/playlists?offset=0&limit=30`,
                {
                    headers: {
                        Authorization: 'Bearer ' + access_token
                    }
                }
            );

            dispatch(fetchListOfPlaylistDataSucceded(listOfPlaylist));
            dispatch(fetchListOfPlaylistDataRequested(false));
        } catch (err) {
            const message = await err.message;
            dispatch(fetchListOfPlaylistDataFailure(message));
            dispatch(fetchListOfPlaylistDataRequested(false));
        }
    };
};
