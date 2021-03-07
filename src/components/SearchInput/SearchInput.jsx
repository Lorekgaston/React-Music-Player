import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchPlaylist } from '../../redux/actions/search';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles({
    searchBar: {
        backgroundColor: '#fff',
        borderRadius: 100,
        height: 35,
        width: '100%',
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: green[600],
                borderWidth: 1,
                boxShadow: '0px 0px 2px 1px #43a047'
            }
        }
    },
    input: {
        borderRadius: 100,
        height: 35,
        color: '#282828',
        fontSize: 15
    },
    icon: {
        cursor: 'pointer'
    }
});
const SearchInput = ({ token }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const [value, setValue] = React.useState('');
    const handleChage = e => {
        e.preventDefault();
        setValue(e.target.value);
        history.push('/search');
        if (!value) {
            return history.push('/home');
        }
    };

    React.useEffect(() => {
        return () => dispatch(fetchPlaylist(value, token));
    }, [value]);
    console.log(value);
    return (
        <>
            <TextField
                id="Search"
                placeholder="Search for artist's playlist..."
                variant="outlined"
                className={classes.searchBar}
                value={value}
                onChange={handleChage}
                margin="normal"
                InputProps={{
                    className: classes.input,
                    endAdornment: (
                        <InputAdornment position="end" className={classes.icon}>
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />
        </>
    );
};

export default SearchInput;

SearchInput.propTypes = {
    token: PropTypes.string
};
