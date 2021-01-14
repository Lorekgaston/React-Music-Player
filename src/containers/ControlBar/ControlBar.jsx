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
            if (progress === 0) {
                setProgress(0);
                dispatch(playSong(false));
            }
            setProgress(Math.round((audio.currentTime / audio.duration) * 100));

            console.log(progress);
        }, 1000);
        return () => clearInterval(timer);
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
        if (volume > 0) {
            audio.muted = false;
            dispatch(handleVolume(newValue));
        }
    };
    const progressHandler = (e, newValue) => {
        setProgress(newValue);
        audio.currentTime = (audio.currentTime / audio.duration) * newValue;
        console.log((audio.currentTime = (audio.currentTime / audio.duration) * newValue));
    };

    const muteHandler = () => {
        if (!audio.muted) {
            audio.muted = true;
        }
        if (audio.muted) {
            dispatch(handleVolume(prevVolume));
            // setIsMuted(false);
        }
    };

    const nextSong = () => {
        dispatch({ type: 'NEXT_SONG' });
    };
    const prevSong = () => {
        dispatch({ type: 'PREVIOUS_SONG' });
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
                    <Progress audio={audio} progress={progress} changeProgress={progressHandler} />
                </div>
            </div>
            <div className={classes.volume}>
                <VolumeController
                    value={volume}
                    handleVolume={volumeHandler}
                    handleMute={muteHandler}
                    muted={volume}
                />
            </div>
        </div>
    );
};

export default ControlBar;
