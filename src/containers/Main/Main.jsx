import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import routes from '../../routes/index';
import SearchInput from '../../components/SearchInput/SearchInput';

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
        // backgroundColor: '#282828'
        backgroundColor: '#000000'
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    appBarRight: {
        width: '50%'
    },
    appBarrLeft: {
        display: 'flex',
        alignItems: 'center'
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
                    <Toolbar className={classes.toolbar}>
                        <div className={classes.appBarRight}>
                            <SearchInput token={token} />
                        </div>
                        <div className={classes.appBarrLeft}>
                            <Typography variant="body2" className={classes.user}>
                                {user}
                            </Typography>
                            <Button color="inherit" variant="text" onClick={() => logOut()}>
                                Log Out
                            </Button>
                        </div>
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
    user: PropTypes.string,
    logOut: PropTypes.func,
    token: PropTypes.string
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
