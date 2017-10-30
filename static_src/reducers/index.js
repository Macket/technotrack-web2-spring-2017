import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import postsReducer from './postsReducer';
import usersReducer from './usersReducer';
import profileReducer from './profileReducer';


export default combineReducers({
    postsReducer,
    usersReducer,
    profileReducer,
    routerReducer,
});
