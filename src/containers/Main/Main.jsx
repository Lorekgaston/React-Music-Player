import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import routes from '../../routes/index';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import './Main.scss';
import PlayList from '../PlayList/PlayList';
import Menu from '../../components/Menu/Menu';

const Main = () => {
    const { isPlaylistOpen } = useSelector(state => state.controller);
    console.log(isPlaylistOpen);
    return (
        <div className="Main">
            <div className={isPlaylistOpen ? 'Main__routes shrink' : 'Main__routes'}>
                <div className="Main__navigation">
                    <NavigateBeforeIcon fontSize="large" />
                    <NavigateNextIcon fontSize="large" />
                </div>
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

            <Menu
                isClicked={isPlaylistOpen}
                classes={'Main__menu'}
                open={'menuOpen'}
                close={'menuClose'}>
                <PlayList />
            </Menu>
        </div>
    );
};

export default Main;

Main.propTypes = {
    // user: PropTypes.string,
    logOut: PropTypes.func,
    token: PropTypes.string
};
