import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import HomeIcon from '@material-ui/icons/Home';
const useStyles = makeStyles({
    root: {
        width: 250,
        height: 'calc(100vh - 90px)',
        backgroundColor: '#000000',
        padding: '10px 0'
    },
    title: {
        color: '#ffff',
        padding: 15
    },
    list: {
        '&.MuiList-root': {
            color: '#b3b3b3'
        },
        padding: 10,
        '&.MuiListItemText-root': {
            backgroundColor: 'white'
        }
    },
    icon: {
        marginRight: 10
    },
    item: {
        '&.MuiListItem-root': {
            height: 40,
            padding: '0 16px'
        },
        '&.Mui-selected': {
            backgroundColor: '#282828',
            borderRaduis: '100px',
            '&:hover': {
                backgroundColor: '#282828',
                color: '#b3b3b3'
            }
        },
        '&:hover': {
            color: 'white'
        }
    },
    text: {
        fontSize: '0.9rem',
        fontWeight: 600
    }
});

const Navbar = () => {
    const history = useHistory();
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index, page) => {
        history.push(page);
        setSelectedIndex(index);
    };
    return (
        <Paper className={classes.root}>
            <Typography variant="h6" className={classes.title}>
                React-Music-Player
            </Typography>
            <List className={classes.list} component="nav">
                <ListItem
                    className={classes.item}
                    button
                    selected={selectedIndex === 0}
                    onClick={event => handleListItemClick(event, 0, '/home')}>
                    <HomeIcon className={classes.icon} />
                    <ListItemText
                        primary={
                            <>
                                <Typography variant="body1" className={classes.text}>
                                    Home
                                </Typography>
                            </>
                        }
                    />
                </ListItem>
                <ListItem
                    className={classes.item}
                    button
                    selected={selectedIndex === 1}
                    onClick={event => handleListItemClick(event, 1, '/categories')}>
                    <SearchIcon className={classes.icon} />
                    <ListItemText
                        primary={
                            <>
                                <Typography variant="body1" className={classes.text}>
                                    Categories
                                </Typography>
                            </>
                        }
                    />
                </ListItem>
                <ListItem
                    className={classes.item}
                    button
                    selected={selectedIndex === 2}
                    onClick={event => handleListItemClick(event, 2)}>
                    <PlaylistPlayIcon className={classes.icon} />
                    <ListItemText
                        primary={
                            <>
                                <Typography variant="body1" className={classes.text}>
                                    Your Playlist
                                </Typography>
                            </>
                        }
                    />
                </ListItem>
            </List>
        </Paper>
    );
};

export default Navbar;
