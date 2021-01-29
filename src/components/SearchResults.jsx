import React from 'react';
import { useSelector } from 'react-redux';
import CoverCard from './CoverCard/CoverCard';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    // card: {
    //     backgroundColor: '#202020',
    //     color: '#ffff',
    //     borderRadius: 5,
    //     width: 160,
    //     margin: 10,
    //     padding: '0.9rem',
    //     cursor: 'pointer',
    //     '&:hover': {
    //         backgroundColor: '#282828'
    //     }
    // },
    card: {
        position: 'relative',
        backgroundColor: '#202020',
        color: '#ffff',
        borderRadius: 5,
        width: '100%',
        maxWidth: 160,
        minHeight: 260,
        margin: 10,
        padding: '0.9rem',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#282828'
        }
    },
    media: {
        height: 170
    },
    cardContent: {
        padding: '10px 0'
    },
    text: {
        textOverflow: 'ellipsis'
    },
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
