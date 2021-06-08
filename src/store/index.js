import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import rootReducers from './rootReducers';

const reduxThunk = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }
  return next(action);
};
// logger
const store = createStore(rootReducers, applyMiddleware(reduxThunk, logger))
// const store = createStore(rootReducers, applyMiddleware(reduxThunk))

export default store;