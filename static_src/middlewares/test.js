export const logger = store => next => (action) => {
    console.log('1 dispatching', action);
    const result = next(action);
    console.log('1 next state', store.getState());
    return result;
};
