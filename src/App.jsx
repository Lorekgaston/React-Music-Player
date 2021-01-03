import * as React from 'react';
import './App.css';
import Controllers from './components/Controllers';
import song1 from './songs/The Offspring - The Kids Arent Alright.mp3';
import song2 from './songs/The Offspring - Youre Gonna Go Far, Kid.mp3';

const audio = new Audio();
const songs = [song1, song2];

function App() {
    const [songPlaying, setSongPlaying] = React.useState(false);
    const [isMuted, setIsMuted] = React.useState(false);
    const [volume, setVolume] = React.useState(50);
    const [index, setIndex] = React.useState(0);
    const [progress, setProgress] = React.useState(0);

    const prevVolumeRef = React.useRef();

    React.useEffect(() => {
        prevVolumeRef.current = volume;
    });
    const prevVolume = prevVolumeRef.current;
    const musicHandler = () => {
        if (songPlaying) {
            audio.pause();
            setSongPlaying(false);
        } else {
            audio.src = songs[index];
            audio.play();
            setSongPlaying(true);
        }
    };
    const handleVolume = (e, newValue) => {
        setVolume(newValue);
        audio.volume = volume / 100;
    };
    const handleMuteVolume = () => {
        if (!isMuted) {
            setVolume(0);
            audio.volume = volume / 100;
            setIsMuted(true);
        } else {
            setVolume(prevVolume);
            audio.volume = volume / 100;
            setIsMuted(false);
        }
    };
    console.log(volume);
    return (
        <div className="App">
            <Controllers
                playing={songPlaying}
                progress={progress}
                handleMusic={musicHandler}
                volumeHandler={handleVolume}
                muteHandler={handleMuteVolume}
                muted={isMuted}
                value={volume}
            />
        </div>
    );
}

export default App;
