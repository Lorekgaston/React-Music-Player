import axios from 'axios';
import * as actionType from '../actionTypes';
import { getAuthToken } from '../../Auth';

const { access_token } = getAuthToken();

const fetchHomeRequest = loading => {
    return {
        type: actionType.FETCH_HOME_REQUESTED,
        loading
    };
};
const fetchHomeSuccess = data => {
    return {
        type: actionType.FETCH_HOME_SUCCEDED,
        data
    };
};
const fetchHomeFail = message => {
    return {
        type: actionType.FETCH_HOME_FAILED,
        message
    };
};

export const fetchHomeData = () => {
    return async dispatch => {
        dispatch(fetchHomeRequest(true));
        try {
            const genres = await axios.get('https://api.spotify.com/v1/me/top/artists', {
                headers: {
                    Authorization: 'Bearer ' + access_token
                }
            });

            if (genres) {
                const requests = [
                    `https://api.spotify.com/v1/me/top/tracks`,
                    `https://api.spotify.com/v1/browse/featured-playlists?limit=20`,
                    `https://api.spotify.com/v1/recommendations?limit=20&seed_genres=rock,jazz,blues,classical`
                ].map(url =>
                    axios
                        .get(url, {
                            headers: {
                                Authorization: 'Bearer ' + access_token
                            }
                        })
                        .catch(err => dispatch(fetchHomeFail(err.message)))
                );
                const [responseOne, responseTwo, responseThree] = await axios.all(requests);
                dispatch(fetchHomeSuccess({ responseOne, responseTwo, responseThree }));
            }
        } catch (err) {
            const message = await err.message;
            dispatch(fetchHomeFail(message));
        }
    };
};
