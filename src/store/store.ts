import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunks from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import userReducer from './user/userReducer';
import formReducer from './form/formReducer';
import jobReducer from './job/jobReducer';
import viewReducer from './view/viewReducer';
import inboxReducer from './inbox/inboxReducer';
import photoReducer from './photos/photoReducer';
import alertReducer from './alert/alertReducer';
import stripeReducer from './stripe/stripeReducer';

export const reducer = combineReducers({
  user: userReducer,
  form: formReducer,
  job: jobReducer,
  view: viewReducer,
  inbox: inboxReducer,
  photos: photoReducer,
  alert: alertReducer,
  stripe: stripeReducer,
});

const middleware = [thunks, createLogger({ collapsed: true })];

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export type StoreState = ReturnType<typeof reducer>;
