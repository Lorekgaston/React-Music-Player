import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { grey, green } from '@material-ui/core/colors';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: 'auto',
        maxWidth: 1356,
        margin: '50px auto',
        backgroundColor: '#202020',
        color: grey[100]
    },
    favorite: {
        color: grey[100],
        '&:hover': {
            backgroundColor: grey[900]
        },
        '&.Mui-checked': {
            color: grey[100]
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

const PlayList = () => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);
    const [liked, setLiked] = React.useState(false);

    return (
        <Paper className={classes.root}>
            <List>
                {[0, 1, 2, 3].map(value => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                        <ListItem className={classes.listItem} key={value} role={undefined}>
                            <ListItemIcon>
                                <IconButton>
                                    <PlayArrowIcon className={classes.play} />
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />

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
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    );
};

export default PlayList;
