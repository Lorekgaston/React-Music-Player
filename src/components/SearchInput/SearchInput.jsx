import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchPlaylist } from '../../redux/actions/search';

import { getAuthToken } from '../../Auth';

import './SearchInput.scss';

const { access_token } = getAuthToken();

const SearchInput = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [value, setValue] = React.useState('');
    const handleChage = e => {
        e.preventDefault();
        setValue(e.target.value);
        if (value.length === 1) {
            return history.push('/home');
        }
        history.push('/search');
    };

    React.useEffect(() => {
        const handler = setTimeout(() => {
            dispatch(fetchPlaylist(value, access_token));
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [value]);
    console.log(value);
    return (
        <div className="SearchInput">
            <input
                type="text"
                autoComplete="off"
                name="searchInput"
                id="searchInput"
                placeholder="Search for spotify playlists and songs..."
                value={value}
                onChange={e => handleChage(e)}
            />
        </div>
    );
};

export default SearchInput;
