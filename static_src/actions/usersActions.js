import { CALL_API, getJSON } from 'redux-api-middleware'
import { normalize } from 'normalizr';
import apiUrls from './../constants/apiUrls';

import { user } from './../utils/schemas';


export const START_USER_LOADING = 'START_USER_LOADING';
export const SUCCESS_USER_LOADING = 'SUCCESS_USER_LOADING';
export const ERROR_USER_LOADING = 'ERROR_USER_LOADING';
export const START = 'START';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

export const loadUsers = (url) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'GET',
            types: [
                START_USER_LOADING,
                {
                    type: SUCCESS_USER_LOADING,
                    payload: (action, state, res) => {
                        return getJSON(res).then(
                            (json) => normalize(json, [user]),
                        );
                    },
                },
                ERROR_USER_LOADING,
            ],
        },
    };
};


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
            types: [START, SUCCESS, ERROR],
        },
    };
};