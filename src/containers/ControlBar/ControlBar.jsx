import * as React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { playSong, handleVolume, setProgress } from '../../redux/actions/controller';
import VolumeController from '../../components/VolumeController/VolumeController';
import Progress from '../../components/Progress/Progress';
import ControlButtons from '../../components/ControlButtons/ControlButtons';
import NowPlaying from '../../components/NowPlaying/NowPlaying';
import './ControlBar.scss';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import { IconButton } from '@material-ui/core';

const ControlBar = ({ audio }) => {
    const dispatch = useDispatch();
    const controller = useSelector(state => state.controller);
    const {
        songPlaying,
        currentTrack,
        index,
        volume,
        progress,
        isMuted,
        trackList,
        isSingle
    } = controller;

    const firstRender = React.useRef(true);
    // const prevVolumeRef = React.useRef();
    const setSong = track => {
        audio.src = track;
        audio.play();
        playHandler();
    };

    React.useEffect(() => {
        const handleAudio = () => {
            !songPlaying ? audio.play() : audio.pause();
        };
        return () => {
            handleAudio();
        };
    }, [songPlaying]);

    React.useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        isSingle ? setSong(currentTrack?.preview_url) : setSong(trackList[index]?.preview_url);
    }, [currentTrack, index, trackList]);

    React.useEffect(() => {
        const timer = setInterval(() => {
            progressHandler();
        }, 1000);

        if (progress >= 97 && progress <= 100) {
            setTimeout(autoPlay(timer), 3000);
        }
        if (!songPlaying) {
            return clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [songPlaying, progress]);

    React.useEffect(() => {
        const changeVolume = () => {
            audio.volume = volume / 100;
        };
        if (isMuted) {
            audio.muted = true;
        }
        if (!isMuted) {
            audio.muted = false;
        }
        return () => changeVolume();
    }, [volume, isMuted]);

    // React.useEffect(() => {
    //     const muteAudio = () => {
    //         if (isMuted) {
    //             audio.muted = true;
    //         }
    //         if (!isMuted) {
    //             audio.muted = false;
    //         }
    //     };
    //     muteAudio();
    // }, [isMuted]);

    // React.useEffect(() => {
    //     prevVolumeRef.current = volume;
    // });

    // const prevVolume = prevVolumeRef.current;

    const autoPlay = timer => {
        dispatch(setProgress(0));
        dispatch(playSong(false));
        clearInterval(timer);
        nextSong();
    };
    console.log(currentTrack);

    const playHandler = () => dispatch(playSong(true));
    const nextSong = () => dispatch({ type: 'NEXT_SONG' });
    const prevSong = () => dispatch({ type: 'PREVIOUS_SONG' });
    const musicHandler = () => dispatch(playSong(!songPlaying));
    const mutedHandler = () => dispatch({ type: 'SET_MUTE' });
    const volumeHandler = (e, newValue) => dispatch(handleVolume(newValue));
    const progressHandler = () =>
        dispatch(setProgress(Math.floor((audio.currentTime / audio.duration) * 100)));

    return (
        <div className="Controlbar">
            {/* <div className="Controlbar__nowPlaying">
                {isSingle ? (
                    <NowPlaying track={currentTrack} />
                ) : (
                    <NowPlaying track={trackList[index]} />
                )}
            </div> */}
            <div className="Controlbar__progressbar">
                {/* <Progress audio={audio} progress={progress} /> */}
                {/* <div className="Controlbar__progressbar_bar"></div> */}
            </div>
            <div className="Controlbar__bottomContainer">
                <div>
                    <IconButton>
                        <QueueMusicIcon
                            fontSize="medium"
                            className="Controlbar__icons"
                            onClick={() => dispatch({ type: 'TOOGLE_PLAYLIST' })}
                        />
                    </IconButton>
                </div>
                <div className="Controlbar__controlButtons">
                    <ControlButtons
                        playing={songPlaying}
                        handlePlaying={musicHandler}
                        next={nextSong}
                        previous={prevSong}
                        isSingle={isSingle}
                    />
                </div>
                <div className="">
                    <VolumeController
                        value={volume}
                        handleVolume={volumeHandler}
                        muted={isMuted}
                        handleMuted={mutedHandler}
                    />
                </div>
            </div>
        </div>
    );
};

export default ControlBar;

ControlBar.propTypes = {
    audio: PropTypes.object
};
