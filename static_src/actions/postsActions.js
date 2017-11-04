import { CALL_API, getJSON } from 'redux-api-middleware'
import { normalize } from 'normalizr';

import { post } from './../utils/schemas';


export const START_POST_LOADING = 'START_POST_LOADING';
export const SUCCESS_POST_LOADING = 'SUCCESS_POST_LOADING';
export const ERROR_POST_LOADING = 'ERROR_POST_LOADING';

export const loadPosts = (url) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'GET',
            types: [
                START_POST_LOADING,
                {
                    type: SUCCESS_POST_LOADING,
                    payload: (action, state, res) => {
                        return getJSON(res).then(
                            (json) => normalize(json, [post]),
                        );
                    },
                },
                ERROR_POST_LOADING,
            ],
        },
    };
};

export const START_POST_PUBLISHING = 'START_POST_PUBLISHING';
export const SUCCESS_POST_PUBLISHING = 'SUCCESS_POST_PUBLISHING';
export const ERROR_POST_PUBLISHING = 'ERROR_POST_PUBLISHING';

export const publishPost = (url, data) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'POST',
            body: data,
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': document.cookie.match(/csrftoken=([^ ;]+)/)[1],
            },
            types: [
                START_POST_PUBLISHING,
                {
                    type: SUCCESS_POST_PUBLISHING,
                    payload: (action, state, res) => {
                        return getJSON(res).then(
                            (json) => normalize(json, post),
                        );
                    },
                },
                ERROR_POST_PUBLISHING,
            ],
        },
    };
};