import * as React from 'react';
import PropTypes from 'prop-types';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    playICon: {
        color: '#f5e8ff',
        fontSize: '2.2rem',
        fontWeight: '700'
    },
    pauseIcon: {
        color: '#ddb0ff',
        fontSize: '2.2rem',
        fontWeight: '700'
    },
    nextIcon: {
        color: '#f5e8ff'
    },
    previousIcon: {
        color: '#f5e8ff'
    }
});

const ControlButtons = ({ playing, handlePlaying, next, previous, isSingle }) => {
    const classes = useStyles();
    return (
        <>
            <IconButton onClick={() => previous()} disabled={isSingle}>
                <SkipPreviousIcon className={classes.previousIcon} />
            </IconButton>
            <IconButton onClick={() => handlePlaying()}>
                {playing ? (
                    <PauseCircleOutlineIcon className={classes.pauseIcon} />
                ) : (
                    <PlayCircleOutlineIcon className={classes.playICon} />
                )}
            </IconButton>
            <IconButton onClick={() => next()} disabled={isSingle}>
                <SkipNextIcon className={classes.nextIcon} />
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
