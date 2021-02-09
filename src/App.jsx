import * as React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ControlBar from './containers/ControlBar/ControlBar';
import Main from './containers/Main/Main';
import { getAuthToken } from './Auth';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';

const audio = new Audio();
const auth = getAuthToken();
function App() {
    const history = useHistory();
    const [token, setToken] = React.useState(null);
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const _token = auth.access_token;
        if (_token) {
            setToken(_token);
            history.push('/home');
        }
    }, []);

    const logOut = () => {
        localStorage.removeItem('token');
        setToken(null);
        audio.src = null;
    };
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
                    </div>
                    <ControlBar audio={audio} />
                </>
            )}
        </div>
    );
}

export default App;
