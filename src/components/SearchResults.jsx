import React from 'react';
import { useSelector } from 'react-redux';
import CoverCard from './CoverCard/CoverCard';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    title: {
        fontSize: 30,
        fontWeight: 700,
        color: '#ffff',
        // padding: 15,
        margin: '0 10px',
        textTransform: 'capitalize'
    }
});

const SearchResults = () => {
    const classes = useStyles();
    const { playlist, loading } = useSelector(state => state.search);
    return (
        <div>
            {loading ? (
                <h1 className={classes.title}>Loading....</h1>
            ) : (
                <>
                    <Typography className={classes.title}>Result for search...</Typography>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
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

export default SearchResults;
