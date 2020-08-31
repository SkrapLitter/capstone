import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunks from 'redux-thunk';
import userReducer from './user/userReducer';

export const reducer = combineReducers({
  user: userReducer,
});

export const store = createStore(reducer, applyMiddleware(thunks));

export type StoreState = ReturnType<typeof reducer>;
