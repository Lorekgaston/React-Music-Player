import * as React from 'react';
import PropTypes from 'prop-types';

import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import { IconButton } from '@material-ui/core';

import './VolumeSlider.scss';

const VolumeController = ({ value, handleVolume, handleMuted, muted }) => {
    console.log(value);
    return (
        <>
            <IconButton onClick={() => handleMuted()}>
                {!muted && value !== 0 ? (
                    value <= 35 && value >= 1 ? (
                        <VolumeMuteIcon />
                    ) : value <= 75 && value >= 36 ? (
                        <VolumeDownIcon />
                    ) : value == 0 ? (
                        <VolumeOffIcon />
                    ) : (
                        <VolumeUpIcon />
                    )
                ) : (
                    <VolumeOffIcon />
                )}
            </IconButton>

            <input type="range" className="VolumeSlider" value={value} onChange={handleVolume} />
        </>
    );
};

export default VolumeController;

VolumeController.propTypes = {
    value: PropTypes.number,
    handleVolume: PropTypes.func,
    handleMuted: PropTypes.func,
    muted: PropTypes.bool
};

{
    /* <VolumeSlider value={value} onChange={handleVolume} className={classes.slider} /> */
}
