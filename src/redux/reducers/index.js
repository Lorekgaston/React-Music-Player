import { combineReducers } from 'redux';
import controller from './controller';
import user from './user';
import search from './search';
import categories from './categories';

const rootReducer = combineReducers({
    controller,
    user,
    search,
    categories
});

export default rootReducer;
