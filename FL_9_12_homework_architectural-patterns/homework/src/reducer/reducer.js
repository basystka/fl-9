const createStore = (reducer) => {
    const listItems = [];
    let state;
    const getState = () => {
        return state;
    };
    const dispatch = (action) => {
        state = reducer(state, action);
        listItems.forEach((el) => {
            el(state);
        });
    };
    const subscribe = (el) => {
        listItems.push(el);
    };
    dispatch();
    return {dispatch, subscribe, getState};
};
export {createStore};