import { combineReducers } from 'redux';
import controller from './controller';
import user from './user';
import search from './search';
import categories from './categories';
import homeData from './homeData';
import listOfPlaylist from './listOfPlaylists';

const rootReducer = combineReducers({
    controller,
    user,
    search,
    categories,
    homeData,
    listOfPlaylist
});

export default rootReducer;
