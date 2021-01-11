import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { convetTominutes } from '../../../utils/handleTime';

const useStyles = makeStyles({
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
    listItemDisabled: {
        cursor: 'default',
        color: grey[800]
    },
    play: {
        color: grey[200]
    }
});

const PlayListTrack = ({ trackListInfo, track, urlList, labelId, play, idx }) => {
    const classes = useStyles();
    const { name, duration_ms } = track;
    return (
        <>
            <ListItem className={classes.listItem}>
                <ListItemIcon>
                    <IconButton onClick={() => play(idx, urlList, trackListInfo)}>
                        <PlayArrowIcon className={classes.play} />
                    </IconButton>
                </ListItemIcon>
                <ListItemAvatar>
                    <Avatar variant="square" src={track.album.images[2].url} />
                </ListItemAvatar>
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
        </>
    );
};

export default PlayListTrack;
