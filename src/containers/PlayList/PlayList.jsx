import * as React from 'react';
import { useDispatch } from 'react-redux';
import { setAudio } from '../../redux/actions/controller';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { grey } from '@material-ui/core/colors';
import { Avatar, Divider, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import useFetch from '../../hooks/useFetch';
import PlayListTrack from '../../components/PlayListTrack/PlayListTrack';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: '#121212',
        color: grey[200]
    },
    header: {
        height: '245px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '24px 32px 0'
    },
    headerText: {
        padding: 20,
        display: 'flex',
        flexDirection: 'column'
    },
    headerType: {
        fontSize: 12,
        marginLeft: 5,
        fontWeight: 600,
        textTransform: 'uppercase'
    },
    headerName: {
        fontSize: 100,
        fontWeight: 600
    },
    headerDescription: {
        fontSize: 14,
        padding: '15px 5px 0'
    },
    avatar: {
        marginRight: 20,
        width: 232,
        height: 232
    },
    favorite: {
        color: grey[200],
        '&:hover': {
            backgroundColor: grey[900]
        },
        '&.Mui-checked': {
            color: grey[200]
        }
    },
    listItem: {
        '&:hover': {
            backgroundColor: grey[800]
        }
    },
    play: {
        color: grey[200]
    },
    listTitle: {
        marginLeft: '3.4rem'
    },
    listHeader: {
        padding: '0 16px'
    },
    headerTime: {
        paddingRight: 12
    },
    divider: {
        backgroundColor: 'rgb(48 48 48 / 0.7)',
        marginBottom: 10
    }
});
// `https://api.spotify.com/v1/playlists/${id}/tracks?offset=0&limit=50`
const PlayList = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const classes = useStyles();

    const { data, isLoading } = useFetch(
        `https://api.spotify.com/v1/playlists/${id}?fields=description,images,name,primary_color,type,tracks.items(track(album,duration_ms,id,name,preview_url))`
    );

    const items = data?.data.tracks.items;
    const playList = items?.filter(song => {
        const { track } = song;
        return track.preview_url != null;
    });

    const trackList = playList?.map(song => {
        const {
            track: {
                preview_url,
                name,
                duration_ms,
                album: { artists, images }
            }
        } = song;
        return { preview_url, name, duration_ms, artists, images };
    });

    const playTrack = idx => dispatch(setAudio({ trackList, idx }));

    console.log(data?.data);
    return (
        <Paper className={classes.root}>
            {isLoading ? (
                <h1>Loaging...</h1>
            ) : (
                <>
                    <div className={classes.header}>
                        <Avatar
                            className={classes.avatar}
                            src={data?.data.images[0].url}
                            alt={data?.data.name}
                            variant="square"
                        />
                        <div className={classes.headerText}>
                            <Typography variant="body1" className={classes.headerType}>
                                {data?.data.type}
                            </Typography>
                            <Typography variant="h2" className={classes.headerName}>
                                {data?.data.name}
                            </Typography>
                            <Typography variant="body1" className={classes.headerDescription}>
                                {data?.data.description}
                            </Typography>
                        </div>
                    </div>
                    <div style={{ padding: '24px 32px 0' }}>
                        <List>
                            <ListItem className={classes.listHeader}>
                                <ListItemText className={classes.listTitle} primary="Track" />
                                <Typography className={classes.headerTime}>Time</Typography>
                            </ListItem>
                            <Divider variant="fullWidth" className={classes.divider} />
                            {trackList?.length > 0 &&
                                trackList?.map((song, idx) => {
                                    // const { track } = song;
                                    const labelId = `checkbox-list-label-${song}`;

                                    return (
                                        <PlayListTrack
                                            key={song + idx}
                                            track={song}
                                            isLoading={isLoading}
                                            play={playTrack}
                                            labelId={labelId}
                                            idx={idx}
                                        />
                                    );
                                })}
                        </List>
                    </div>
                </>
            )}
        </Paper>
    );
};

export default PlayList;
