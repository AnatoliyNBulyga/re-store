import { createStore, compose } from "redux";
import reducer from "./reducers";

const STRING_ENHANCER = (createStore) => (...args) => {
   const store = createStore(...args);
   const originalDispatch = store.dispatch;
    store.dispatch = (action) => {
        if (typeof action === 'string') {
            return originalDispatch({
                type: action
            })
        }
        return originalDispatch(action);
    };
    return store;
};

const LOG_ENHANCER = (createStore) => (...args) => {
    const store = createStore(...args);
    const originalDispatch = store.dispatch;
    store.dispatch = (action) => {
        console.log(action.type);
        return originalDispatch(action);
    }
    return store;
}

const store = createStore(reducer, compose(STRING_ENHANCER, LOG_ENHANCER));

store.dispatch('HELLO_WORLD');

export default store;
