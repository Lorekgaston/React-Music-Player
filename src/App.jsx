import * as React from 'react';
import axios from 'axios';
import { Route, Switch, useHistory } from 'react-router-dom';
import ControlBar from './components/ControlBar/ControlBar';
import Playlist from './components/PlayList';
import Header from './components/Header';
import { getAuthToken } from './Auth';
import useFetchCategories from './hooks/useFetchCategories';
import CategoriesList from './components/Categories/CategoriesList';
import CategoryPage from './components/CategoryPage/CategoryPage';
import Login from './components/Login/Login';

const audio = new Audio();

function App() {
    const history = useHistory();
    const [songPlaying, setSongPlaying] = React.useState(false);
    const [isMuted, setIsMuted] = React.useState(false);
    const [volume, setVolume] = React.useState(50);
    const [index, setIndex] = React.useState(0);
    const [progress, setProgress] = React.useState(0);
    const [token, setToken] = React.useState(null);
    const [user, setUser] = React.useState('');
    const [tracksUrl, setTrackUrl] = React.useState([]);
    const [currentTrack, setCurrentTrack] = React.useState(null);

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
            if (res) {
                setUser(res.data.email);
            }
        };
        if (auth) {
            window.location.hash = '';
            setToken(_token);
            getUserInfo();
        }
    }, []);

    const { catergories, isLoading, error, errorMessage } = useFetchCategories(
        'https://api.spotify.com/v1/browse/categories'
    );

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
    }, [songPlaying]);

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
    const setSong = (index, trackList, track) => {
        setTrackUrl(trackList);
        setCurrentTrack(track);
        if (tracksUrl) {
            audio.src = tracksUrl[index];
            audio.play();
            setSongPlaying(true);
        }
    };
    const logOut = () => {
        window.location.hash = '';
        setToken(null);
        history.push('/login');
    };

    return (
        <div className="App">
            {!token ? (
                <Login />
            ) : (
                <Switch>
                    <>
                        <Header token={token} user={user} logOut={logOut} />
                        <Route exact path="/">
                            <CategoriesList categories={catergories} loading={isLoading} />
                        </Route>
                        <Route exact path="/categoryPage/:id">
                            <CategoryPage token={token} />
                        </Route>
                        <Route exact path="/playlist/:id">
                            <Playlist play={setSong} />
                        </Route>
                        <ControlBar
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
                            currentTrack={currentTrack}
                        />
                    </>
                </Switch>
            )}
        </div>
    );
}

export default App;

//
