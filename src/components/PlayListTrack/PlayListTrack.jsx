import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AlbumIcon from '@material-ui/icons/Album';
import { Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

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
        cursor: 'pointer',
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
    },
    primary: {
        color: grey[100],
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.6,
        letterSpacing: '0.0200em',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    secondary: {
        color: grey[500],
        cursor: 'pointer',
        fontSize: '0.78rem',
        marginRight: 5,
        '&:hover': {
            textDecoration: 'underline'
        }
    }
});

const PlayListTrack = ({ track: { name, images = [], artists } = {}, play, index }) => {
    const classes = useStyles();
    return (
        <ListItem className={classes.listItem} onClick={() => play(index)}>
            <ListItemAvatar>
                {images[0]?.url ? (
                    <Avatar variant="square" src={images[0]?.url} />
                ) : (
                    <Avatar variant="square">
                        <AlbumIcon />
                    </Avatar>
                )}
            </ListItemAvatar>
            <ListItemText
                primary={
                    <>
                        <Typography variant="h6" noWrap={true}>
                            {name}
                        </Typography>
                    </>
                }
                secondary={artists?.map(artist => (
                    <Typography key={artist.id} variant="caption">
                        {artist.name}
                    </Typography>
                ))}
            />
        </ListItem>
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
    index: PropTypes.number
};

{
    /* <FormControlLabel
                    control={
                        <Checkbox
                            className={classes.favorite}
                            icon={<FavoriteBorder />}
                            checkedIcon={<Favorite />}
                            name="checkedH"
                        />
                    }
                /> */
}
