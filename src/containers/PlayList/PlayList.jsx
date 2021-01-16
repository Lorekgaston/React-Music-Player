import * as React from 'react';
import { useDispatch } from 'react-redux';
import { setAudio } from '../../redux/actions/controller';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { grey } from '@material-ui/core/colors';
import { Divider, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import useFetch from '../../hooks/useFetch';
import PlayListTrack from '../../components/PlayListTrack/PlayListTrack';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        width: '100%',
        // height: 'calc(100vh - 154px)',
        // maxHeight: '100%',
        // overflowY: 'scroll',
        // backgroundColor: '#202020',
        backgroundColor: '#121212',
        color: grey[200]
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

const PlayList = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const classes = useStyles();
    const { data, isLoading } = useFetch(
        `https://api.spotify.com/v1/playlists/${id}/tracks?offset=0&limit=50`
    );
    const items = data?.data.items;
    const playList = items?.filter(song => {
        const { track } = song;
        return track.preview_url != null;
    });
    const playTrack = idx => {
        const trackList = playList?.map(song => {
            const {
                track: { preview_url, album }
            } = song;
            return { preview_url, album };
        });

        dispatch(setAudio({ trackList, idx }));
    };
    return (
        <Paper className={classes.root}>
            {isLoading ? (
                <h1>Loaging...</h1>
            ) : (
                <List>
                    <ListItem className={classes.listHeader}>
                        <ListItemText className={classes.listTitle} primary="Track" />
                        <Typography className={classes.headerTime}>Time</Typography>
                    </ListItem>
                    <Divider variant="fullWidth" className={classes.divider} />
                    {playList?.length > 0 &&
                        playList?.map((song, idx) => {
                            const { track } = song;
                            const labelId = `checkbox-list-label-${song}`;

                            return (
                                <PlayListTrack
                                    key={song + idx}
                                    track={track}
                                    play={playTrack}
                                    labelId={labelId}
                                    idx={idx}
                                />
                            );
                        })}
                </List>
            )}
        </Paper>
    );
};

export default PlayList;
