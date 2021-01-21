import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AlbumIcon from '@material-ui/icons/Album';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { parseTime } from '../../utils/handleTime';

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
    },
    time: {
        paddingRight: 12
    }
});

const PlayListTrack = ({ track: { duration_ms, name, images }, labelId, play, idx }) => {
    const classes = useStyles();
    return (
        <>
            <ListItem className={classes.listItem}>
                <ListItemIcon>
                    <IconButton onClick={() => play(idx)}>
                        <PlayArrowIcon className={classes.play} />
                    </IconButton>
                </ListItemIcon>
                <ListItemAvatar>
                    {images[0].url ? (
                        <Avatar variant="square" src={images[0].url} />
                    ) : (
                        <Avatar variant="square">
                            <AlbumIcon />
                        </Avatar>
                    )}
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
                <Typography className={classes.time}>{parseTime(duration_ms)}</Typography>
            </ListItem>
        </>
    );
};

export default PlayListTrack;

PlayListTrack.propTypes = {
    track: PropTypes.object,
    name: PropTypes.string,
    duration_ms: PropTypes.string,
    album: PropTypes.object,
    labelId: PropTypes.string,
    play: PropTypes.func,
    idx: PropTypes.number
};
