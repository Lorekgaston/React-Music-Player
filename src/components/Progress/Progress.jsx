import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green, grey } from '@material-ui/core/colors';
import { parseTime } from '../../utils/handleTime';

const useStyles = makeStyles({
    progressBar: {
        width: '80%',
        color: grey[50],
        flexGrow: 1,
        marginRight: '8px',
        marginLeft: '8px',
        '&:hover': {
            color: green[200]
        }
    }
});
const ProgressSlider = withStyles({
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
            boxShadow: green[600]
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

const Progress = ({ audio, progress, changeProgress }) => {
    const classes = useStyles();
    return (
        <>
            <Typography variant="caption">{parseTime(audio.currentTime)}</Typography>
            <ProgressSlider
                value={progress}
                onChange={changeProgress}
                variant="determinate"
                className={classes.progressBar}
            />
            <Typography variant="caption">
                {isNaN(progress) ? '00:00' : parseTime(audio.duration)}
            </Typography>
        </>
    );
};

export default Progress;
