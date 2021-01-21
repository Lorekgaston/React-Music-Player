import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { redirect_url } from '../../Auth';
import Categories from '../../components/Categories/Categories';
import CategoryPage from '../../components/CategoryPage/CategoryPage';
import Playlist from '../PlayList/PlayList';
import Home from '../../components/Home/Home';
import Album from '../Album/Album';
import routes from '../../routes/index';

const useStyles = makeStyles({
    root: {
        width: '100%',
        overflowY: 'auto'
    },
    nav: {
        height: '56px',
        width: '100%'
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
    },
    titles: {
        height: 33,
        color: 'white',
        fontSize: 24,
        textOverflow: 'ellipsis'
    },
    content: {
        padding: '0.6rem 0.6rem',
        height: 'auto'
    },
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.6em'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#282828',
            borderRadius: '20px'
        }
    }
});

const Main = ({ token, user, logOut }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.nav}>
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
            <div>
                <div style={{ padding: '24px 32px 0' }}>
                    <Switch>
                        {routes.map((route, i) => (
                            <Route
                                key={i}
                                path={route.path}
                                exact
                                render={props => <route.component {...props} />}
                            />
                        ))}
                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default Main;

Main.propTypes = {
    token: PropTypes.string,
    user: PropTypes.string,
    logOut: PropTypes.func
};

{
    /* <Route exact path="/home">
                        <Home />
                    </Route>
                    <Route exact path="/categories">
                        <Categories />
                    </Route>
                    <Route exact path="/categoryPage/:id">
                        <CategoryPage token={token} />
                    </Route>
                    <Route exact path="/playlist/:id">
                        <Playlist />
                    </Route>
                    <Route exact path="/album/:id">
                        <Album />
                    </Route> */
}
