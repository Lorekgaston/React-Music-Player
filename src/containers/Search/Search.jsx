import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CoverCard from '../../components/CoverCard/CoverCard';
import { Typography } from '@material-ui/core';
import { getAuthToken } from '../../Auth';
import { fetchPlaylist } from '../../redux/actions/search';
import './Search.scss';

const { access_token } = getAuthToken();

const Search = () => {
    const { playlist, loading } = useSelector(state => state.search);
    const dispatch = useDispatch();
    const [value, setValue] = React.useState('');

    React.useEffect(() => {
        return () => setTimeout(dispatch(fetchPlaylist(value, access_token)), 500);
    }, [value]);
    return (
        <div className="Search">
            {loading ? (
                <h1>Loading....</h1>
            ) : (
                <>
                    <div className="Search__input">
                        <input
                            type="text"
                            name="searchInput"
                            id="searchInput"
                            placeholder="Search..."
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                    </div>
                    <Typography variant="h3">Result for search...</Typography>
                    <div className="Search__results">
                        {playlist?.length > 0 &&
                            playlist?.map((playlist, idx) => (
                                <CoverCard
                                    key={playlist.id + idx}
                                    image={playlist?.images[0]?.url}
                                    name={playlist.name}
                                    param={`/playlist/${playlist.id}`}
                                />
                            ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Search;
