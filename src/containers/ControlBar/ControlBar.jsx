import * as React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { playSong, handleVolume, setProgress } from '../../redux/actions/controller';
import VolumeController from '../../components/VolumeController/VolumeController';
import ControlButtons from '../../components/ControlButtons/ControlButtons';
import NowPlaying from '../../components/NowPlaying/NowPlaying';

import useResize from '../../hooks/useResize';

import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import { IconButton } from '@material-ui/core';

import './ControlBar.scss';
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
    const { isPlaylistOpen } = useSelector(state => state.controller);
    const { isMobile } = useResize();
    const firstRender = React.useRef(true);
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

    const autoPlay = timer => {
        dispatch(setProgress(0));
        dispatch(playSong(false));
        clearInterval(timer);
        nextSong();
    };

    const playHandler = () => dispatch(playSong(true));
    const nextSong = () => dispatch({ type: 'NEXT_SONG' });
    const prevSong = () => dispatch({ type: 'PREVIOUS_SONG' });
    const musicHandler = () => dispatch(playSong(!songPlaying));
    const mutedHandler = () => dispatch({ type: 'SET_MUTE' });
    const volumeHandler = e => dispatch(handleVolume(e.target.value));
    const progressHandler = () =>
        dispatch(setProgress(Math.floor((audio.currentTime / audio.duration) * 100)));

    return (
        <div className={isPlaylistOpen ? 'Controlbar ControlbarShrinked' : 'Controlbar'}>
            <div className="Controlbar__progressbar">
                <div
                    className="Controlbar__progressbar_bar"
                    style={{
                        '--progress': `${progress}%`
                    }}></div>
            </div>
            <div className="Controlbar__bottomContainer">
                <div className="Controlbar__menuIcon">
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
                {isMobile < 600 ? (
                    <div className="Controlbar__nowPlaying">
                        {isSingle ? (
                            <NowPlaying track={currentTrack} />
                        ) : (
                            <NowPlaying track={trackList[index]} />
                        )}
                    </div>
                ) : (
                    <div className="Controlbar__controlVolume">
                        <VolumeController
                            value={volume}
                            handleVolume={volumeHandler}
                            muted={isMuted}
                            handleMuted={mutedHandler}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ControlBar;

ControlBar.propTypes = {
    audio: PropTypes.object
};
