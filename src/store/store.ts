import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunks from 'redux-thunk';
import userReducer from './user/userReducer';
import formReducer from './form/formReducer';
import jobReducer from './job/jobReducer';
import viewReducer from './view/viewReducer';

export const reducer = combineReducers({
  user: userReducer,
  form: formReducer,
  job: jobReducer,
  view: viewReducer,
});

export const store = createStore(reducer, applyMiddleware(thunks));

export type StoreState = ReturnType<typeof reducer>;
