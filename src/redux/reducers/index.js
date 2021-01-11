import { combineReducers } from 'redux';
import controller from './controller';
import user from './user';

const rootReducer = combineReducers({
    controller: controller,
    user: user
});

export default rootReducer;
