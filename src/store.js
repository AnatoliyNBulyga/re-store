import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import thunkMiddleware from 'redux-thunk';

const logMiddleware = ({ getState, dispatch }) => (dispatch) => (action) => {
    console.log(action.type, getState());
    return dispatch(action);
};
const stringMiddleware = () => (dispatch) => (action) => {
    if (typeof action === 'string') {
        return dispatch({
            type: action
        });
    }
    return dispatch(action);
};


const store = createStore(reducer, applyMiddleware(thunkMiddleware, stringMiddleware, logMiddleware));

const delayedActionCreator = (timeout) => (dispatch) => {
    setTimeout(() => dispatch({
        type: 'DELAY_ACTION'
    }), timeout);
};

store.dispatch(delayedActionCreator(2000));

export default store;
