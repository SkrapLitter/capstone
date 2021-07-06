import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunks from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import userReducer from './user/userReducer';
import jobReducer from './job/jobReducer';
import inboxReducer from './inbox/inboxReducer';
import photoReducer from './photos/photoReducer';
import alertReducer from './alert/alertReducer';

export const reducer = combineReducers({
  user: userReducer,
  job: jobReducer,
  inbox: inboxReducer,
  photos: photoReducer,
  alert: alertReducer,
});

const middleware = [thunks, createLogger({ collapsed: true })];

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export type StoreState = ReturnType<typeof reducer>;
