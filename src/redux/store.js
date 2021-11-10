import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';

import userInfo from './common/userInfo/reducer'
import {renderProjectReducer as renderProject} from "./common/renderProject";
import menuStatus from './common/menuStatus/reducer'

const reducer = combineReducers({
    userInfo,
    renderProject,
    menuStatus
});

const RootReducer = (state, action) => {
    return reducer(state, action);
}

const store = createStore(RootReducer, applyMiddleware(thunk));

export default store;