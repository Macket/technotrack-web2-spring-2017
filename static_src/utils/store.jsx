import { createStore, applyMiddleware, compose } from 'redux';
import initReducers from './../reducers/index';
import middlewares from './../middlewares/index';


function initStore(additionalMiddlewares = []) {
    const innitialStore = {};
    return createStore(
        initReducers,
        innitialStore,
        compose(
            applyMiddleware(...additionalMiddlewares, ...middlewares),
            window.__REDUX_DEVTOOLS_EXTENSION__(),
        ),
    );
}

export default initStore;