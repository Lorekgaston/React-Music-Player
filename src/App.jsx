import * as React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ControlBar from './containers/ControlBar/ControlBar';
import Main from './containers/Main/Main';
import { getAuthToken } from './Auth';
import CategoryPage from './components/CategoryPage/CategoryPage';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';

const audio = new Audio();
const auth = getAuthToken();

function App() {
    const history = useHistory();
    const [token, setToken] = React.useState(null);
    const [user, setUser] = React.useState('');

    React.useEffect(() => {
        const _token = auth.access_token;
        const getUserInfo = async () => {
            const res = await axios(`https://api.spotify.com/v1/me`, {
                headers: {
                    Authorization: 'Bearer ' + _token
                }
            });
            if (res) {
                console.log(`logged as ${res.data.email}`);
                setUser(res.data.email);
            }
        };

        if (_token) {
            // window.location.hash = '';
            setToken(_token);
            getUserInfo();
        }
    }, []);

    const logOut = () => {
        window.location.hash = '';
        setToken(null);
        history.push('/login');
    };
    console.log(auth);
    return (
        <div style={{ height: '100vh', minHeight: '100%' }}>
            {!token ? (
                <Login />
            ) : (
                <>
                    <div
                        style={{
                            height: 'calc(100vh - 90px)',
                            background: '#121212',
                            display: 'flex'
                        }}>
                        <Navbar />
                        <Main token={token} user={user} logOut={logOut} />
                        {/* <Switch>
                            
                            <Route exact path="/categoryPage/:id">
                                <CategoryPage token={token} />
                            </Route>
                            <Route exact path="/playlist/:id">
                                <Playlist />
                            </Route>
                        </Switch> */}
                    </div>
                    <ControlBar audio={audio} />
                </>
            )}
        </div>
    );
}

export default App;

// {!token ? (
//     <Login />
// ) : (
//     <Switch>
//         <>
//             <Header token={token} user={user} logOut={logOut} />
//             <Route exact path="/">
//                 <CategoriesList categories={catergories} loading={isLoading} />
//             </Route>
//             <Route exact path="/categoryPage/:id">
//                 <CategoryPage token={token} />
//             </Route>
//             <Route exact path="/playlist/:id">
//                 <Playlist />
//             </Route>
//             <ControlBar audio={audio} />
//         </>
//     </Switch>
// )}
