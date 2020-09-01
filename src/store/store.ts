import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunks from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import userReducer from './user/userReducer';

export const reducer = combineReducers({
  user: userReducer,
});

const middleware = [thunks, createLogger({ collapsed: true })];

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export type StoreState = ReturnType<typeof reducer>;
