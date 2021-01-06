import React from 'react';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import LinearProgress from '@material-ui/core/LinearProgress';
import { IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import VolumeController from './VolumeController';

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: '#282828',
        color: grey[300],
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    name: {
        width: '40%',
        flexGrow: 1
    },
    control: {
        width: '40%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1
    },
    playButton: {
        marginLeft: '5px',
        marginRight: '5px',
        color: grey[300]
    },
    volume: {
        width: '40%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexGrow: 1
    },
    slider: {
        width: '100px',
        color: grey[50],
        marginLeft: '10px',
        marginRight: '10px'
    },
    progressContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '15px'
    },
    progressBar: {
        width: '80%',
        flexGrow: 1,
        marginRight: '8px',
        marginLeft: '8px'
    }
});

const Controllers = ({
    playing,
    handlePlaying,
    progress,
    volumeHandler,
    value,
    muteHandler,
    muted,
    next,
    previous,
    currentTime,
    duration
}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.name}>The offspring</div>
            <div className={classes.control}>
                <div>
                    <IconButton className={classes.playButton} onClick={() => next()}>
                        <SkipPreviousIcon fontSize="medium" />
                    </IconButton>
                    <IconButton className={classes.playButton} onClick={() => handlePlaying()}>
                        {playing ? (
                            <PauseCircleOutlineIcon fontSize="large" />
                        ) : (
                            <PlayCircleOutlineIcon fontSize="large" />
                        )}
                    </IconButton>
                    <IconButton className={classes.playButton} onClick={() => previous()}>
                        <SkipNextIcon fontSize="medium" />
                    </IconButton>
                </div>
                <div className={classes.progressContainer}>
                    <Typography variant="caption">{currentTime()}</Typography>
                    <LinearProgress
                        value={progress}
                        variant="determinate"
                        className={classes.progressBar}
                    />
                    <Typography variant="caption">
                        {progress === 0 ? '00:00' : duration()}
                    </Typography>
                </div>
            </div>
            <div className={classes.volume}>
                <VolumeController
                    value={value}
                    volumeHandler={volumeHandler}
                    muteHandler={muteHandler}
                    muted={muted}
                />
            </div>
        </div>
    );
};

export default Controllers;
