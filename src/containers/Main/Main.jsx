import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import routes from '../../routes/index';
import SearchInput from '../../components/SearchInput/SearchInput';
import User from '../../components/User/User';
import './Main.scss';

const Main = ({ token, logOut }) => {
    return (
        <div className="Main">
            <div className="Navbar">
                <div className="Navbar__topbar">
                    {/* <User token={token} /> */}
                    <Button color="inherit" variant="text" onClick={() => logOut()}>
                        Log Out
                    </Button>
                    <Avatar />
                </div>
                <div className="Navbar__searchbar">
                    <SearchInput token={token} />
                </div>
            </div>
            <div className="Main__body">
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
    );
};

export default Main;

Main.propTypes = {
    // user: PropTypes.string,
    logOut: PropTypes.func,
    token: PropTypes.string
};
