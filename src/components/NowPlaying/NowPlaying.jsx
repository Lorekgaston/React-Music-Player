import React from 'react';
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

const NowPlaying = ({ currentTrack }) => {
    const classes = useStyles();
    return (
        <>
            {!currentTrack ? null : (
                <List className={classes.root}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar variant="square" src={currentTrack.album.images[2].url} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <>
                                    <Typography variant="body2" className={classes.primary}>
                                        {currentTrack.name}
                                    </Typography>
                                </>
                            }
                            secondary={currentTrack.artists.map(artist => (
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
