import User from './userInterface';
import TYPES from '../types';

const defaultUser: User = {
  id: '',
  username: 'guest',
  firstName: 'Guesty',
  lastName: 'McNotLoggedIn',
  image: '',
  clearance: 0,
  error: '',
  stripe: '',
  balance: 0,
  payments: [],
};

const userReducer = (state: User = defaultUser, action): User => {
  const { user, type, error } = action;
  switch (type) {
    case TYPES.LOGIN_SUCCESS:
    case TYPES.CREATE_ACCOUNT:
    case TYPES.UPDATE_ACCOUNT:
      return user;
    case TYPES.LOGIN_FAIL:
      return {
        ...state,
        error,
      };
    case TYPES.LOGOUT:
      return defaultUser;
    default:
      return state;
  }
};

export default userReducer;
