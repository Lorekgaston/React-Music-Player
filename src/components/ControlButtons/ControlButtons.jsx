import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import { IconButton } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles({
    button: {
        marginLeft: '5px',
        marginRight: '5px',
        color: grey[300]
    }
});

const ControlButtons = ({ playing, handlePlaying, next, previous, isSingle }) => {
    const classes = useStyles();
    return (
        <>
            <IconButton className={classes.button} onClick={() => previous()} disabled={isSingle}>
                <SkipPreviousIcon fontSize="medium" />
            </IconButton>
            <IconButton className={classes.button} onClick={() => handlePlaying()}>
                {playing ? (
                    <PauseCircleOutlineIcon fontSize="large" />
                ) : (
                    <PlayCircleOutlineIcon fontSize="large" />
                )}
            </IconButton>
            <IconButton className={classes.button} onClick={() => next()} disabled={isSingle}>
                <SkipNextIcon fontSize="medium" />
            </IconButton>
        </>
    );
};

export default ControlButtons;

ControlButtons.propTypes = {
    playing: PropTypes.bool,
    handlePlaying: PropTypes.func,
    next: PropTypes.func,
    previous: PropTypes.func,
    isSingle: PropTypes.bool
};
