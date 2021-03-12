import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from '../../routes/index';
import './Main.scss';
import PlayList from '../PlayList/PlayList';

const Main = () => {
    return (
        <div className="Main">
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
    );
};

export default Main;

Main.propTypes = {
    // user: PropTypes.string,
    logOut: PropTypes.func,
    token: PropTypes.string
};
