import User from './userInterface';
import TYPES from '../types';

const defaultUser: User = {
  id: '1',
  username: 'guest',
  firstName: 'Guesty',
  lastName: 'McNotLoggedIn',
  image: '',
  clearance: 0,
};

const userReducer = (state: User = defaultUser, action): User => {
  const { user, type } = action;
  switch (type) {
    case 'LOGIN_SUCCESS':
    case 'CREATE_ACCOUNT':
      return user;
    case 'LOGIN_FAIL':
      return defaultUser;
    case TYPES.LOGOUT:
      return defaultUser;
    default:
      return state;
  }
};

export default userReducer;
