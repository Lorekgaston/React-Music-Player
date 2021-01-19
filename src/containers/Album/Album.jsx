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
        // height: 'calc(100vh - 154px)',
        // maxHeight: '100%',
        // overflowY: 'scroll',
        // backgroundColor: '#202020',
        backgroundColor: '#121212',
        color: grey[200]
    },
    header: {
        height: 340,
        display: 'flex',
        justifyContent: 'flexStart'
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
const Album = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const classes = useStyles();
    const { data, isLoading } = useFetch(`https://api.spotify.com/v1/albums/${id}`);

    const { artists } = data?.data || {};
    const items = data?.data.tracks.items;

    let trackList = items
        ?.filter(song => {
            return song.preview_url != null;
        })
        .map(item => {
            const { preview_url, name, duration_ms, images } = item;
            return { preview_url, name, duration_ms, images, artists };
        });

    // const playTrack = idx => dispatch(setAudio({ trackList, idx }));
    console.log(data);

    return (
        <Paper className={classes.root}>
            {isLoading ? (
                <h1>Loaging...</h1>
            ) : (
                <>
                    {/* <div className={classes.header}>
                        <Avatar src={data?.data.images[0].url} />
                        <div>
                            <Typography variant="h1">{data?.data.name}</Typography>
                            <Typography variant="body1">{data?.data.artists[0].name}</Typography>
                        </div>
                    </div>
                    <List>
                        <ListItem className={classes.listHeader}>
                            <ListItemText className={classes.listTitle} primary="Track" />
                            <Typography className={classes.headerTime}>Time</Typography>
                        </ListItem>
                        <Divider variant="fullWidth" className={classes.divider} />
                        {trackList?.length > 0 &&
                            trackList?.map((song, idx) => {
                                const labelId = `checkbox-list-label-${song}`;

                                return (
                                    <PlayListTrack
                                        key={song + idx}
                                        track={song}
                                        play={playTrack}
                                        labelId={labelId}
                                        idx={idx}
                                    />
                                );
                            })}
                    </List> */}
                </>
            )}
        </Paper>
    );
};

export default Album;
