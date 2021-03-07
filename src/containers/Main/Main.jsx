import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from '../../routes/index';
import Header from '../../components/Header/Header';
import './Main.scss';

const Main = ({ token, logOut }) => {
    return (
        <div className="Main">
            <Header token={token} />

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
