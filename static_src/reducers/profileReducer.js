import update from 'react-addons-update';
import { START_PROFILE_LOADING, SUCCESS_PROFILE_LOADING, ERROR_PROFILE_LOADING, SUCCESS_SUBSCRIBE } from '../actions/profileActions';


const initialStore = {
    profile: {},
    isLoading: false,
};


export default function profileReducer(store = initialStore, action) {
    switch (action.type) {
        case START_PROFILE_LOADING: {
            return update(store, {
                isLoading: { $set: true },
            });
        }
        case SUCCESS_PROFILE_LOADING: {
            return update(store, {
                isLoading: { $set: false },
                profile: { $merge: action.payload.entities.profile[1] },
            });
        }
        case ERROR_PROFILE_LOADING: {
            return update(store, {
                isLoading: { $set: false },
            });
        }
        case SUCCESS_SUBSCRIBE: {
            if (action.payload.id) {
                store.profile.subscriptions.push(action.payload.to_user);
                return store;
            } else {
                store.profile.subscriptions.splice(
                    store.profile.subscriptions.indexOf(action.payload.to_user), 1);
                return store;
            }
        }
        default:
            return store;
    }
}
