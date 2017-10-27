import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import posts from './posts';


export default combineReducers({
    posts,
    routerReducer,
});
