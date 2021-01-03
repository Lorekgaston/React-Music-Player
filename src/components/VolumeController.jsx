import React from 'react';
import Slider from '@material-ui/core/Slider';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green, grey } from '@material-ui/core/colors';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles({
    slider: {
        width: '100px',
        color: grey[50],
        marginLeft: '10px',
        marginRight: '10px'
    }
});

const VolumeSlider = withStyles({
    root: {
        color: green[600],
        height: 2
    },
    thumb: {
        height: 12,
        width: 12,
        backgroundColor: green[600],
        border: '2px solid currentColor',
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit'
        }
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)'
    },
    track: {
        height: 3,
        borderRadius: 4
    },
    rail: {
        color: grey[300],
        height: 3,
        borderRadius: 4
    }
})(Slider);
const VolumeController = ({ value, volumeHandler, muteHandler, muted }) => {
    const classes = useStyles();
    return (
        <>
            <IconButton onClick={() => muteHandler()}>
                {!muted ? (
                    value <= 35 && value >= 1 ? (
                        <VolumeMuteIcon />
                    ) : value <= 75 && value >= 36 ? (
                        <VolumeDownIcon />
                    ) : value === 0 ? (
                        <VolumeOffIcon />
                    ) : (
                        <VolumeUpIcon />
                    )
                ) : (
                    <VolumeOffIcon />
                )}
            </IconButton>
            <VolumeSlider value={value} onChange={volumeHandler} className={classes.slider} />
        </>
    );
};

export default VolumeController;
