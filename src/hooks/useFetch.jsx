import * as React from 'react';
import axios from 'axios';
import { getAuthToken } from '../Auth';

const auth = getAuthToken();

const useFetch = url => {
    const [data, setData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [token, setToken] = React.useState(auth.access_token);

    React.useEffect(() => {
        const getCategories = async () => {
            setIsLoading(true);
            try {
                const response = await axios(url, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
                if (response) {
                    setData(response);
                } else {
                    setError(true);
                }
                setIsLoading(false);
            } catch (err) {
                setError(true);
                setErrorMessage(err.message);
                setIsLoading(false);
            }
        };
        if (token) {
            getCategories();
        }
    }, [url]);

    return { data, isLoading, error, errorMessage, token };
};

export default useFetch;
