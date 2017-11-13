import { CALL_API, getJSON } from 'redux-api-middleware'
import { normalize } from 'normalizr';
import apiUrls from './../constants/apiUrls';

import { like } from './../utils/schemas';


export const START_LIKE_PUTTING = 'START_LIKE_PUTTING';
export const SUCCESS_LIKE_PUTTING = 'SUCCESS_LIKE_PUTTING';
export const ERROR_LIKE_PUTTING = 'ERROR_LIKE_PUTTING';

export const putLike = (data) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: apiUrls.likes,
            method: 'POST',
            body: data,
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': document.cookie.match(/csrftoken=([^ ;]+)/)[1],
            },
            types: [
                START_LIKE_PUTTING,
                {
                    type: SUCCESS_LIKE_PUTTING,
                    payload: (action, state, res) => getJSON(res).then(
                        json => normalize(json, like),
                    ),
                },
                ERROR_LIKE_PUTTING,
            ],
        },
    };
};
