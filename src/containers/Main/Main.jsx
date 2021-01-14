import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { redirect_url } from '../../Auth';
import CategoriesList from '../../components/Categories/CategoriesList';
import Home from '../../components/Home/Home';

const useStyles = makeStyles({
    root: {
        width: '100%',
        overflowY: 'auto'
    },
    nav: {
        height: '56px',
        width: '100%'
        // width: 'calc(100% - 250px)',
        // padding: '0.5rem 2rem',
        // flexGrow: 1
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
        padding: '0.6rem 0.8rem'
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

const Main = ({ token, user, logOut, catergories, isLoading }) => {
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
            <div className={classes.content}>
                <Typography variant="h1" className={classes.titles}>
                    Hello
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Switch>
                        <Route exact path="/home">
                            <Home />
                        </Route>
                        <Route exact path="/categories">
                            <CategoriesList categories={catergories} loading={isLoading} />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default Main;
