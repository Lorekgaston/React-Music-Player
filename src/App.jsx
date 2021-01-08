import * as React from 'react';
import axios from 'axios';
import Controllers from './components/Controllers';
import Playlist from './components/PlayList';
import Header from './components/Header';
import { getAuthToken } from './Auth';

const audio = new Audio();

function App() {
    const [songPlaying, setSongPlaying] = React.useState(false);
    const [isMuted, setIsMuted] = React.useState(false);
    const [volume, setVolume] = React.useState(50);
    const [index, setIndex] = React.useState(0);
    const [progress, setProgress] = React.useState(0);
    const [token, setToken] = React.useState(null);
    const [user, setUser] = React.useState('');
    const [isLoadin, setIsloading] = React.useState(false);
    const [error, seterror] = React.useState(false);
    const [playlist, setPlaylist] = React.useState([]);
    const [tracksUrl, setTrackUrl] = React.useState([]);

    const firstRender = React.useRef(true);
    const prevVolumeRef = React.useRef();

    React.useEffect(() => {
        const auth = getAuthToken();
        const _token = auth.access_token;
        const getUserInfo = async () => {
            const res = await axios(`https://api.spotify.com/v1/me`, {
                headers: {
                    Authorization: 'Bearer ' + _token
                }
            });
            setUser(res.data.email);
        };
        if (_token) {
            // window.location.hash = '';
            setToken(_token);
            getUserInfo();
        }
    }, []);
    React.useEffect(() => {
        const getUserPlaylist = async () => {
            setIsloading(true);
            try {
                const res = await axios(`https://api.spotify.com/v1/me/playlists`, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
                if (res) {
                    const secondRes = await axios(
                        'https://api.spotify.com/v1/playlists/37i9dQZEVXcF247tqMiGPo/tracks',
                        {
                            headers: {
                                Authorization: 'Bearer ' + token
                            }
                        }
                    );
                    const urlList = secondRes.data.items.map(tracks => {
                        return tracks.track.preview_url;
                    });
                    setPlaylist(secondRes.data.items);
                    setTrackUrl(urlList);
                } else {
                    seterror(true);
                }
                setIsloading(false);
            } catch (err) {
                seterror(true);
                console.log(err);
                setIsloading(false);
            }
        };

        getUserPlaylist();
    }, [token]);

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
            audio.src = tracksUrl[index];
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
        index === tracksUrl.length - 1 ? setIndex(0) : setIndex(prevIndex => prevIndex + 1);
    };
    const prevSong = () => {
        index === 0 ? setIndex(tracksUrl.length - 1) : setIndex(prevIndex => prevIndex - 1);
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
    const setSong = index => {
        audio.src = tracksUrl[index];
        audio.play();
        setSongPlaying(true);
    };
    return (
        <div className="App">
            <Header token={token} user={user} />
            {!token ? (
                <>
                    <h1>Please Log In</h1>
                </>
            ) : (
                <>
                    <Playlist playList={playlist} loading={isLoadin} error={error} play={setSong} />
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
                </>
            )}
        </div>
    );
}

export default App;
