import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import Reducer from "./reducer";

import thunk from "redux-thunk";

const rootReducer = combineReducers({ app: Reducer });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);