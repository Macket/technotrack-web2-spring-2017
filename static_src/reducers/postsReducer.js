import update from 'react-addons-update';
import { START_POST_LOADING, SUCCESS_POST_LOADING, ERROR_POST_LOADING } from '../actions/postsActions';
import { START_POST_PUBLISHING, SUCCESS_POST_PUBLISHING, ERROR_POST_PUBLISHING } from '../actions/postsActions';

const initialStore = {
    postList: [],
    posts: {},
    isLoading: false,
};


export default function postsReducer(store = initialStore, action) {

    switch (action.type) {
        case START_POST_LOADING || START_POST_PUBLISHING: {
            return update(store, {
                isLoading: {$set: true},
            });
        }
        case SUCCESS_POST_LOADING || SUCCESS_POST_PUBLISHING: {
            return update(store, {
                isLoading: {$set: false},
                postList: { $set: action.payload.result },
                posts: {$merge: action.payload.entities.posts},
            });
        }
        case ERROR_POST_LOADING || ERROR_POST_PUBLISHING: {
            return update(store, {
                isLoading: {$set: false},
            });
        }
        default:
            return store;
    }
}
