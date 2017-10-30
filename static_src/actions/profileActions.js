import { CALL_API, getJSON } from 'redux-api-middleware'
import { normalize } from 'normalizr';

import { profile } from './../utils/schemas';


export const START_PROFILE_LOADING = 'START_PROFILE_LOADING';
export const SUCCESS_PROFILE_LOADING = 'SUCCESS_PROFILE_LOADING';
export const ERROR_PROFILE_LOADING = 'ERROR_PROFILE_LOADING';

export const loadProfile = (url) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'GET',
            types: [
                START_PROFILE_LOADING,
                {
                    type: SUCCESS_PROFILE_LOADING,
                    payload: (action, state, res) => {
                        return getJSON(res).then(
                            (json) => normalize(json, profile),
                        );
                    },
                },
                ERROR_PROFILE_LOADING,
            ],
        },
    };
};
