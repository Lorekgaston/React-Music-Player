import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    primary: {
        color: grey[100],
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    secondary: {
        color: grey[500],
        cursor: 'pointer',
        marginRight: 5,
        '&:hover': {
            textDecoration: 'underline'
        }
    }
});

const NowPlaying = ({ track }) => {
    const classes = useStyles();
    return (
        <>
            {!track ? null : (
                <List className={classes.root}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar variant="square" src={track.images[2].url} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <>
                                    <Typography variant="body2" className={classes.primary}>
                                        {track.name}
                                    </Typography>
                                </>
                            }
                            secondary={track.artists.map(artist => (
                                <Typography
                                    key={artist.id}
                                    variant="caption"
                                    className={classes.secondary}>
                                    {artist.name}
                                </Typography>
                            ))}
                        />
                    </ListItem>
                </List>
            )}
        </>
    );
};

export default NowPlaying;

NowPlaying.propTypes = {
    track: PropTypes.object
};
