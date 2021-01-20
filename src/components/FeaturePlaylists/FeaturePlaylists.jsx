import * as React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CoverCard from '../CoverCard/CoverCard';

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

const FeaturePlaylists = ({ data }) => {
    const classes = useStyles();
    return (
        <>
            <Typography className={classes.title}>Feature Playlists</Typography>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {data?.data.playlists.items.length > 0 &&
                    data?.data.playlists.items.map((playlist, idx) => (
                        <CoverCard
                            key={playlist.id + idx}
                            image={playlist.images[0].url}
                            name={playlist.name}
                            param={`/playlist/${playlist.id}`}
                        />
                    ))}
            </div>
        </>
    );
};

export default FeaturePlaylists;

// <>
//     {isLoading ? (
//         <Typography className={classes.title}>Loading...</Typography>
//     ) : (
//         <>
//             <Typography className={classes.title}>Feature Playlists</Typography>
//             <div style={{ display: 'flex' }}>
//                 {data?.data.playlists.items.length > 0 &&
//                     data?.data.playlists.items.map((playlist, idx) => (
//                         <CoverCard
//                             key={playlist.id + idx}
//                             image={playlist.images[0].url}
//                             name={playlist.name}
//                             param={`/playlist/${playlist.id}`}
//                         />
//                     ))}
//             </div>
//         </>
//     )}
// </>
