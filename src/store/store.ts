import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunks from 'redux-thunk';
import userReducer from './user/userReducer';
import { mapReducer } from './map/mapReducer';

export const reducer = combineReducers({
  user: userReducer,
  map: mapReducer,
});

export const store = createStore(reducer, applyMiddleware(thunks));

export type StoreState = ReturnType<typeof reducer>;
