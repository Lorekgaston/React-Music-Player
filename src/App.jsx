import * as React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Route, Switch, useHistory } from 'react-router-dom';
import ControlBar from './containers/ControlBar/ControlBar';
import Playlist from './containers/PlayList/PlayList';
import Header from './components/Header';
import { getAuthToken } from './Auth';
import useFetchCategories from './hooks/useFetchCategories';
import CategoriesList from './components/Categories/CategoriesList';
import CategoryPage from './components/CategoryPage/CategoryPage';
import Login from './components/Login/Login';

const audio = new Audio();

function App() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [token, setToken] = React.useState(null);
    const [user, setUser] = React.useState('');
    // const [tracksUrl, setTrackUrl] = React.useState([]);
    // const [index, setIndex] = React.useState(0);

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
            // window.location.hash = '';
            setToken(_token);
            getUserInfo();
        }
    }, []);

    const { catergories, isLoading } = useFetchCategories(
        'https://api.spotify.com/v1/browse/categories'
    );

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
                            <Playlist />
                        </Route>
                        <ControlBar audio={audio} />
                    </>
                </Switch>
            )}
        </div>
    );
}

export default App;
