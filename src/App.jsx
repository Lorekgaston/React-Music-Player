import * as React from 'react';
import './App.css';
import Controllers from './components/Controllers';
import song1 from './songs/The Offspring - The Kids Arent Alright.mp3';
import song2 from './songs/The Offspring - Youre Gonna Go Far, Kid.mp3';

const audio = new Audio(song1);
const songs = [song1, song2];

function App() {
    const [songPlaying, setSongPlaying] = React.useState(false);
    const [isMuted, setIsMuted] = React.useState(false);
    const [volume, setVolume] = React.useState(50);
    const [index, setIndex] = React.useState(0);
    const [progress, setProgress] = React.useState(0);

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
    }, []);

    React.useEffect(() => {
        const changeSong = () => {
            audio.src = songs[index];
            audio.play();
            setSongPlaying(true);
        };
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        changeSong();
    }, [index]);

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
        setSongPlaying(!songPlaying);
    };

    const handleVolume = (e, newValue) => {
        setVolume(newValue);
        if (isMuted && volume > 0) {
            setIsMuted(false);
            setVolume(newValue);
        }
    };

    const handleMuteVolume = () => {
        if (!isMuted) {
            setVolume(0);
            setIsMuted(true);
        }
        if (isMuted) {
            setVolume(prevVolume);
            setIsMuted(false);
        }
    };

    const nextSong = () => {
        index === songs.length - 1 ? setIndex(0) : setIndex(prevIndex => prevIndex + 1);
    };
    const prevSong = () => {
        index === 0 ? setIndex(songs.length - 1) : setIndex(prevIndex => prevIndex - 1);
    };
    const renderCurrentTime = () => {
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

    const renderDuration = () => {
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
        <div className="App">
            <Controllers
                playing={songPlaying}
                progress={progress}
                handlePlaying={musicHandler}
                volumeHandler={handleVolume}
                muteHandler={handleMuteVolume}
                next={nextSong}
                previous={prevSong}
                muted={isMuted}
                value={volume}
                currentTime={renderCurrentTime}
                duration={renderDuration}
            />
        </div>
    );
}

export default App;
