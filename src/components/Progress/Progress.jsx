import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles({
    progressBar: {
        width: '80%',
        flexGrow: 1,
        marginRight: '8px',
        marginLeft: '8px',
        '&:hover': {
            color: green[200]
        }
    }
});

const Progress = ({ currentTime, duration, progress }) => {
    const classes = useStyles();
    return (
        <>
            <Typography variant="caption">{currentTime()}</Typography>
            <LinearProgress
                value={progress}
                valueBuffer={progress}
                variant="determinate"
                className={classes.progressBar}
            />
            <Typography variant="caption">{!progress ? '00:00' : duration()}</Typography>
        </>
    );
};

export default Progress;
