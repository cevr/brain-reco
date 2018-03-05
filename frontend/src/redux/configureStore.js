import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import reducer from './reducer';

export const history = createHistory();

const middleware = [thunk, routerMiddleware(history)];

const rootReducer = combineReducers({
    reducer,
    router: routerReducer
});

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
