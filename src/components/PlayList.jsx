import * as React from 'react';
import axios from 'axios';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { grey } from '@material-ui/core/colors';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { Paper, Typography } from '@material-ui/core';
import { convetTominutes } from '../utils/handleTime';
import useFetch from '../hooks/useFetch';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: 'auto',
        maxHeight: 780,
        overflowY: 'scroll',
        maxWidth: 1356,
        margin: '25px auto',
        backgroundColor: '#202020',
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
    }
});

const PlayList = ({ token, play }) => {
    const { pathname } = useLocation();
    const history = useHistory();
    const { id } = useParams();
    const classes = useStyles();

    const { data, isLoading } = useFetch(
        `https://api.spotify.com/v1/playlists/${id}/tracks?offset=0&limit=30`
    );
    const tracks = data?.data.items;
    const urlList = tracks?.map(song => {
        const {
            track: { preview_url }
        } = song;
        return preview_url;
    });
    console.log(urlList);

    return (
        <Paper className={classes.root}>
            {isLoading ? (
                <h1>Loaging...</h1>
            ) : (
                <List>
                    {tracks?.length > 0 &&
                        tracks?.map((song, idx) => {
                            const {
                                track: { name, duration_ms }
                            } = song;
                            const labelId = `checkbox-list-label-${song}`;

                            return (
                                <ListItem
                                    className={classes.listItem}
                                    key={song + idx}
                                    role={undefined}>
                                    <ListItemIcon>
                                        <IconButton onClick={() => play(idx, urlList)}>
                                            <PlayArrowIcon className={classes.play} />
                                        </IconButton>
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={name} />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                className={classes.favorite}
                                                icon={<FavoriteBorder />}
                                                checkedIcon={<Favorite />}
                                                name="checkedH"
                                            />
                                        }
                                    />
                                    <Typography>{convetTominutes(duration_ms)}</Typography>
                                </ListItem>
                            );
                        })}
                </List>
            )}
        </Paper>
    );
};

export default PlayList;
