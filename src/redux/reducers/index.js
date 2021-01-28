import { combineReducers } from 'redux';
import controller from './controller';
import user from './user';
import search from './search';

const rootReducer = combineReducers({
    controller,
    user,
    search
});

export default rootReducer;
