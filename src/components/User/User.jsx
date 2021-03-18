import * as React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../redux/actions/user';

import Typography from '@material-ui/core/Typography';

const useFetchUser = action => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(action);
    }, []);
};

const User = ({ token }) => {
    const { user: { display_name } = {} } = useSelector(state => state.user);
    useFetchUser(fetchUser(token));
    return (
        <>
            <Typography variant="h6">{display_name}</Typography>
        </>
    );
};

export default User;

User.propTypes = {
    token: PropTypes.string
};
