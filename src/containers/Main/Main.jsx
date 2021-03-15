import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import routes from '../../routes/index';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import './Main.scss';
import PlayList from '../PlayList/PlayList';
import Menu from '../../components/Menu/Menu';
import { IconButton } from '@material-ui/core';
import SearchInput from '../../components/SearchInput/SearchInput';

const Main = () => {
    const { isPlaylistOpen } = useSelector(state => state.controller);
    const history = useHistory();
    return (
        <div className="Main">
            <div className={isPlaylistOpen ? 'Main__routes shrink' : 'Main__routes'}>
                <div className="Main__navigation">
                    <SearchInput />
                    <div>
                        <IconButton disabled={history.location.pathname === '/home'}>
                            <NavigateBeforeIcon fontSize="large" onClick={() => history.goBack()} />
                        </IconButton>
                        <IconButton>
                            <NavigateNextIcon
                                fontSize="large"
                                onClick={() => history.goForward()}
                            />
                        </IconButton>
                    </div>
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
