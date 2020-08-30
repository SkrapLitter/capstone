import { createStore, combineReducers } from 'redux';
// import { ThunkMiddleware } from 'redux-thunk';

import User from './userInterface';

const defaultUser: User = {
  id: '1',
  username: 'guest',
  firstName: 'Guesty',
  lastName: 'McNotLoggedIn',
  image: '',
  clearance: 1,
};

const userReducer = (state: User = defaultUser, action): User => {
  switch (action.type) {
    default:
      return state;
  }
};

export const reducer = combineReducers({
  user: userReducer,
});

export const store = createStore(reducer);

export type StoreState = ReturnType<typeof reducer>;
