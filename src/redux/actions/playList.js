import axios from 'axios';
import {
    FETCH_PLAYLIST_REQUESTED,
    FETCH_PLAYLIST_SUCCEDED,
    FETCH_PLAYLIST_FAILED
} from '../actionTypes';
import { getAuthToken } from '../../Auth';
import {
    handleTrackData,
    handleTracklistData,
    filterPlayableTracks
} from '../../utils/handletrackList';

const { access_token } = getAuthToken();

const fetchPLaylistRequested = loading => {
    return {
        type: FETCH_PLAYLIST_REQUESTED,
        loading
    };
};
const fetchPLaylistSucceded = tracks => {
    return {
        type: FETCH_PLAYLIST_SUCCEDED,
        tracks
    };
};
const fetchPLaylistFailed = errorMessage => {
    return {
        type: FETCH_PLAYLIST_FAILED,
        errorMessage
    };
};

export const fetchPlaylist = (id, type) => {
    return async dispatch => {
        dispatch(fetchPLaylistRequested(true));
        let url;
        try {
            if (type === 'playlist') {
                url = `https://api.spotify.com/v1/playlists/${id}?fields=description,owner(display_name,external_urls),images,name,primary_color,type,tracks.items(track(album,duration_ms,id,name,preview_url))`;
                const response = await axios.get(url, {
                    headers: {
                        Authorization: 'Bearer ' + access_token
                    }
                });
                const { data } = response;
                const { tracks: { items } = {} } = { ...data };
                const playableTracks = filterPlayableTracks(items);
                const trackList = handleTracklistData(playableTracks);
                dispatch(
                    fetchPLaylistSucceded({
                        ...data,
                        tracks: trackList
                    })
                );
            }
            if (type === 'track') {
                url = `https://api.spotify.com/v1/tracks/${id}`;
                const response = await axios.get(url, {
                    headers: {
                        Authorization: 'Bearer ' + access_token
                    }
                });
                const { data } = response;

                const track = handleTrackData(data);
                dispatch(fetchPLaylistSucceded(track));
            }
        } catch (err) {
            dispatch(fetchPLaylistFailed(err.message));
        }
    };
};
