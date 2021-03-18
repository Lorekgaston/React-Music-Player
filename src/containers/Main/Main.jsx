import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import routes from '../../routes/index';
import PlayList from '../PlayList/PlayList';
import Menu from '../../components/Menu/Menu';
import SearchInput from '../../components/SearchInput/SearchInput';

import './Main.scss';

const Main = () => {
    const { isPlaylistOpen } = useSelector(state => state.controller);
    return (
        <div className="Main">
            <div className={isPlaylistOpen ? 'Main__routes shrink' : 'Main__routes'}>
                <div className="Main__navigation">
                    <SearchInput />
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

            <Menu isClicked={isPlaylistOpen} classes={'Main__menu'} open={'menuOpen'}>
                <PlayList />
            </Menu>
        </div>
    );
};

export default Main;
