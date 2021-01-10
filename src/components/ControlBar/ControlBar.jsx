import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import VolumeController from '../VolumeController';
import Progress from '../Progress/Progress';
import ControlButtons from '../ControlButtons/ControlButtons';
import NowPlaying from '../NowPlaying/NowPlaying';

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        height: 90,
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
    volume: {
        width: '40%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexGrow: 1,
        padding: '8px 16px'
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
    }
});

const ControlBar = ({
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
    duration,
    currentTrack
}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.name}>
                <NowPlaying currentTrack={currentTrack} />
            </div>
            <div className={classes.control}>
                <div>
                    <ControlButtons
                        playing={playing}
                        handlePlaying={handlePlaying}
                        next={next}
                        previous={previous}
                    />
                </div>
                <div className={classes.progressContainer}>
                    <Progress currentTime={currentTime} duration={duration} progress={progress} />
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

export default ControlBar;
