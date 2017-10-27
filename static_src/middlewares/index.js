import { apiMiddleware } from 'redux-api-middleware';
import { logger } from './test';

export default [
    logger,
    apiMiddleware,
];