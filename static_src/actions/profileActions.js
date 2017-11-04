import { CALL_API, getJSON } from 'redux-api-middleware'
import { normalize } from 'normalizr';
import apiUrls from './../constants/apiUrls';

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

export const START_SUBSCRIBE = 'START_SUBSCRIBE';
export const SUCCESS_SUBSCRIBE = 'SUCCESS_SUBSCRIBE';
export const ERROR_SUBSCRIBE = 'ERROR_SUBSCRIBE';

export const subscribe = (data) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: apiUrls.subscribes,
            method: 'POST',
            body: data,
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': document.cookie.match(/csrftoken=([^ ;]+)/)[1],
            },
            types: [
                START_SUBSCRIBE,
                {
                    type: SUCCESS_SUBSCRIBE,
                    payload: (action, state, res) => {
                        return getJSON(res).then(
                            (json) => json,
                        );
                    },
                },
                ERROR_SUBSCRIBE,
            ],
        },
    };
};