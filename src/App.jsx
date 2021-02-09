import * as React from 'react';
import { useHistory } from 'react-router-dom';
import ControlBar from './containers/ControlBar/ControlBar';
import Main from './containers/Main/Main';
import { getAuthToken } from './Auth';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';

const audio = new Audio();

const { access_token } = getAuthToken();

const App = () => {
    const history = useHistory();
    const [token, setToken] = React.useState(null);
    React.useEffect(() => {
        if (access_token) {
            setToken(access_token);
            localStorage.setItem('token', access_token);
            history.push('/home');
        }
    }, []);

    const logOut = () => {
        localStorage.removeItem('token');
        setToken(null);
        history.push('/');
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
                        <Main token={token} logOut={logOut} />
                    </div>
                    <ControlBar audio={audio} />
                </>
            )}
        </div>
    );
};

export default App;
