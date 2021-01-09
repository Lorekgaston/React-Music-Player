import * as React from 'react';
import axios from 'axios';
import { getAuthToken } from '../Auth';

const auth = getAuthToken();

const useFetchCategories = url => {
    const [catergories, setCategories] = React.useState(null);
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
                    setCategories(response.data.categories.items);
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
    }, []);

    return { catergories, isLoading, error, errorMessage };
};

export default useFetchCategories;
