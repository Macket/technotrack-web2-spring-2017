import update from 'react-addons-update';
import { START_USER_LOADING, SUCCESS_USER_LOADING, ERROR_USER_LOADING } from '../actions/usersActions';

const initialState = {
    userList: [],
    users: {},
    isLoading: false,
};


export default function usersReducer(store = initialState, action) {
    let newStore = store;
    if (action.payload && action.payload.entities && action.payload.entities.users) {
        newStore = update(store, {
            users: { $merge: action.payload.entities.users },
        });
    }
    switch (action.type) {
        case START_USER_LOADING: {
            return update(store, {
                isLoading: {$set: true},
            });
        }
        case SUCCESS_USER_LOADING: {
            return update(store, {
                isLoading: {$set: false},
                userList: { $set: action.payload.result },
                users: {$merge: action.payload.entities.users},
            });
        }
        case ERROR_USER_LOADING: {
            return update(store, {
                isLoading: {$set: false},
            });
        }
        default:
            return newStore;
    }
}