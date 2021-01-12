import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playSong, handleVolume } from '../../redux/actions/controller';
import VolumeController from '../../components/VolumeController';
import Progress from '../../components/Progress/Progress';
import ControlButtons from '../../components/ControlButtons/ControlButtons';
import NowPlaying from '../../components/NowPlaying/NowPlaying';
import { useStyles } from './styles';

const ControlBar = ({ audio }) => {
    const dispatch = useDispatch();
    const controller = useSelector(state => state.controller);
    // const [isMuted, setIsMuted] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const classes = useStyles();
    const { songPlaying, currentTrack, index, volume } = controller;

    const firstRender = React.useRef(true);
    const prevVolumeRef = React.useRef();

    React.useEffect(() => {
        const handleAudio = () => {
            !songPlaying ? audio.play() : audio.pause();
        };
        return () => {
            handleAudio();
        };
    }, [songPlaying]);

    React.useEffect(() => {
        const changeSong = () => {
            // setCurrentTrack(songs[index]);
            audio.src = currentTrack[index]?.preview_url;
            audio.play();
            dispatch(playSong(true));
        };
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        changeSong();
    }, [index, currentTrack]);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress(oldProgress => {
                if (oldProgress === 100) {
                    return 0;
                }
                return (audio.currentTime / audio.duration) * 100;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [songPlaying]);

    React.useEffect(() => {
        const changeVolume = () => {
            audio.volume = volume / 100;
        };
        changeVolume();
    }, [volume]);

    React.useEffect(() => {
        prevVolumeRef.current = volume;
    });

    const prevVolume = prevVolumeRef.current;

    const musicHandler = () => {
        dispatch(playSong(!songPlaying));
    };

    const volumeHandler = (e, newValue) => {
        dispatch(handleVolume(newValue));
        // setVolume(newValue);
        // if (isMuted && volume > 0) {
        //     setIsMuted(false);
        //     setVolume(newValue);
        // }
    };

    // const muteHandler = () => {
    //     if (!isMuted) {
    //         setVolume(0);
    //         setIsMuted(true);
    //     }
    //     if (isMuted) {
    //         setVolume(prevVolume);
    //         setIsMuted(false);
    //     }
    // };

    const nextSong = () => {
        dispatch({ type: 'NEXT_SONG' });
    };
    const prevSong = () => {
        dispatch({ type: 'PREVIOUS_SONG' });
    };
    const currentTimeHandler = () => {
        let minutes = Math.floor(audio.currentTime / 60);
        let seconds = Math.floor(audio.currentTime % 60);
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    };

    const durationHandler = () => {
        let minutes = Math.floor(audio.duration / 60);
        let seconds = Math.floor(audio.duration % 60);
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    };
    return (
        <div className={classes.root}>
            <div className={classes.name}>
                <NowPlaying currentTrack={currentTrack[index]?.album} />
            </div>
            <div className={classes.control}>
                <div>
                    <ControlButtons
                        playing={songPlaying}
                        handlePlaying={musicHandler}
                        next={nextSong}
                        previous={prevSong}
                    />
                </div>
                <div className={classes.progressContainer}>
                    <Progress
                        currentTime={currentTimeHandler}
                        duration={durationHandler}
                        progress={progress}
                    />
                </div>
            </div>
            <div className={classes.volume}>
                <VolumeController
                    value={volume}
                    handleVolume={volumeHandler}
                    // handleMute={muteHandler}
                    muted={volume}
                />
            </div>
        </div>
    );
};

export default ControlBar;
