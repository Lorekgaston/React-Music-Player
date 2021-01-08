import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { redirect_url } from '../Auth';

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    appBar: {
        backgroundColor: '#282828'
    },
    title: {
        flexGrow: 1
    },
    user: {
        textTransform: 'capitalize',
        padding: '6px 8px',
        borderRight: 'solid 2px #fff'
    }
});

const Header = ({ token, user }) => {
    const classes = useStyles();
    // const [token, setToken] = React.useState('');
    const logOut = () => (window.location.hash = '');

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        React-Music-Player
                    </Typography>
                    {token ? (
                        <>
                            <Typography variant="body2" className={classes.user}>
                                {user}
                            </Typography>
                            <Button color="inherit" variant="text" onClick={() => logOut()}>
                                Log Out
                            </Button>
                        </>
                    ) : (
                        <Button color="inherit" href={redirect_url}>
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
