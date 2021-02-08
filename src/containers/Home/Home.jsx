import * as React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import FeaturePlaylists from '../../components/FeaturePlaylists/FeaturePlaylists';
import RecentlyPlayed from '../../components/RecentlyPlayed/RecentlyPlayed';
import Recommendations from '../../components/Recommendations/Recommendations';
import { Typography } from '@material-ui/core';
import { fetchHomeData } from '../../redux/actions/homeData';

const useStyles = makeStyles({
    section: {
        minHeight: 300,
        marginBottom: 12
    }
});

const useThunkAction = action => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(action);
    }, []);
};

const Home = () => {
    const classes = useStyles();
    const {
        recentlyPlayed,
        featuredPlaylists,
        recommendations,
        isLoading,
        error,
        errorMessage
    } = useSelector(state => state.homeData);
    useThunkAction(fetchHomeData());
    return (
        <>
            {error && <Typography>{errorMessage}</Typography>}
            {isLoading ? (
                <div style={{ padding: '24px 32px 0', display: 'flex', justifyContent: 'center' }}>
                    <Typography>Loading...</Typography>
                </div>
            ) : (
                <>
                    <section className={classes.section}>
                        <RecentlyPlayed data={recentlyPlayed} />
                    </section>
                    <section className={classes.section}>
                        <Recommendations data={recommendations} />
                    </section>
                    <section className={classes.section}>
                        <FeaturePlaylists data={featuredPlaylists} />
                    </section>
                </>
            )}
        </>
    );
};

export default Home;

Home.propTypes = {
    token: PropTypes.string
};
