import * as React from 'react';
import axios from 'axios';
import { getAuthToken } from '../Auth';

const auth = getAuthToken();

const useFetchHomeData = urls => {
    const [recentlyPlayed, setRecentlyPlayed] = React.useState(null);
    const [featuredPlaylists, setFeaturedPlaylists] = React.useState(null);
    const [recommendations, setRecommendations] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    // const [token, setToken] = React.useState(auth.access_token);

    React.useEffect(() => {
        const _token = auth.access_token;
        const requests = urls.map(url =>
            axios
                .get(url, {
                    headers: {
                        Authorization: 'Bearer ' + _token
                    }
                })
                .catch(err => null)
        );
        const fetchmultiple = async () => {
            setIsLoading(true);
            try {
                const [resOne, resTwo, resThree] = await axios.all(requests);
                console.log(resOne, resTwo, resThree);
                setRecentlyPlayed(resOne);
                setFeaturedPlaylists(resTwo);
                setRecommendations(resThree);
            } catch (err) {
                console.log(err);
                setError(true);
                setErrorMessage(err.errorMessage);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };
        fetchmultiple();
    }, []);
    return { recentlyPlayed, featuredPlaylists, recommendations, isLoading, error, errorMessage };
};

export default useFetchHomeData;
