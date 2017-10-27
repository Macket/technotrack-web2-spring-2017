import update from 'react-addons-update';
import { START_POST_LOADING, SUCCESS_POST_LOADING, ERROR_POST_LOADING } from './../actions/posts';


const initialStore = {
    postList: [],
    posts: {},
    isLoading: false,
};


export default function posts(store = initialStore, action) {

    switch (action.type) {
        case START_POST_LOADING: {
            return update(store, {
                isLoading: {$set: true},
            });
        }
        case SUCCESS_POST_LOADING: {
            return update(store, {
                isLoading: {$set: false},
                postList: { $set: action.payload.result },
                posts: {$merge: action.payload.entities.posts},
            });
        }
        case ERROR_POST_LOADING: {
            return update(store, {
                isLoading: {$set: false},
            });
        }
        default:
            return store;
    }
}
