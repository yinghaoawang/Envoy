import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';

const middlewares = [];
let store;

const configureStore = (initialState) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  return store;
}

export { configureStore };