import * as React from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const CategoryPage = ({ token }) => {
    const { id } = useParams();
    const history = useHistory();
    const [data, setData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    React.useEffect(() => {
        const getCategoryPLaylists = async () => {
            setIsLoading(true);
            try {
                const response = await axios(
                    `https://api.spotify.com/v1/browse/categories/${id}/playlists`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    }
                );
                if (response) {
                    setData(response.data.playlists.items);
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
            getCategoryPLaylists();
        }
    }, []);
    console.log(data);
    return (
        <div>
            {isLoading ? (
                <h1>Loading....</h1>
            ) : (
                data?.length > 0 &&
                data?.map((playlist, idx) => (
                    <div key={playlist.id + idx} onClick={() => history.push(`/playlist/${id}`)}>
                        <h1>{playlist.name}</h1>
                    </div>
                ))
            )}
        </div>
    );
};

export default CategoryPage;
