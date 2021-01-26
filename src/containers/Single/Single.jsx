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
import { parseTime } from '../../utils/handleTime';
import { handleTrackData } from '../../utils/handletrackList';
import PlaylistTracklist from '../../components/PlaylistTracklist/PlaylistTracklist';

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
        fontSize: 50,
        fontWeight: 600
    },
    headerDescription: {
        fontSize: 14,
        padding: '15px 5px 0'
    },
    headerBottom: {
        display: 'flex',
        flexDirection: 'row',
        padding: '0 5px'
    },
    headerBottomItem: {
        marginRight: 5
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
const Album = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const classes = useStyles();
    const { data, isLoading } = useFetch(`https://api.spotify.com/v1/tracks/${id}`);

    const trackList = handleTrackData(data);

    const playTrack = i => dispatch(setAudio(trackList));

    console.log(`${data?.name.substring(0, 24)}...`);
    return (
        <Paper className={classes.root}>
            {isLoading ? (
                <h1>Loaging...</h1>
            ) : (
                <>
                    <div className={classes.header}>
                        <Avatar
                            className={classes.avatar}
                            src={data?.album.images[0]?.url}
                            alt={data?.name}
                            variant="square"
                        />
                        <div className={classes.headerText}>
                            <Typography variant="body1" className={classes.headerType}>
                                {data?.type}
                            </Typography>
                            <Typography variant="h2" className={classes.headerName}>
                                {data?.name}
                            </Typography>

                            <div className={classes.headerBottom}>
                                {data?.artists?.map(artist => (
                                    <Typography
                                        key={artist.id}
                                        variant="caption"
                                        className={classes.headerBottomItem}>
                                        {artist.name}
                                    </Typography>
                                ))}
                                <Typography variant="caption" className={classes.headerBottomItem}>
                                    1 Songs -
                                </Typography>
                                <Typography variant="caption" className={classes.headerBottomItem}>
                                    {parseTime(data?.duration_ms)}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div style={{ padding: '24px 32px 0' }}>
                        <List>
                            <ListItem className={classes.listHeader}>
                                <ListItemText className={classes.listTitle} primary="Track" />
                                <Typography className={classes.headerTime}>Time</Typography>
                            </ListItem>
                            <Divider variant="fullWidth" className={classes.divider} />
                        </List>
                        <PlayListTrack track={trackList} isLoading={isLoading} play={playTrack} />
                    </div>
                </>
            )}
        </Paper>
    );
};

export default Album;
