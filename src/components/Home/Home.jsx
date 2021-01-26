import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useFetchHomeData from '../../hooks/useFetchHomeData';
import FeaturePlaylists from '../FeaturePlaylists/FeaturePlaylists';
import RecentlyPlayed from '../RecentlyPlayed/RecentlyPlayed';
import Recommendations from '../Recommendations/Recommendations';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    section: {
        minHeight: 300,
        marginBottom: 12
    }
});

const Home = () => {
    const classes = useStyles();
    const { featuredPlaylists, recentlyPlayed, recommendations, isLoading } = useFetchHomeData([
        `https://api.spotify.com/v1/me/player/recently-played?limit=8`,
        `https://api.spotify.com/v1/browse/featured-playlists?limit=8&locale=us_AR`,
        `https://api.spotify.com/v1/recommendations?limit=8&seed_genres=rock,jazz,blues,classical`
    ]);
    console.log(recommendations);
    return (
        <>
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
