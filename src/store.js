import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { thunk, logger } from './middleware';

const store = createStore(reducers, applyMiddleware(thunk, logger));

export default store;
