import User from './userInterface';

const defaultUser: User = {
  id: '1',
  username: 'guest',
  firstName: 'Guesty',
  lastName: 'McNotLoggedIn',
  image: '',
  clearance: 0,
  error: '',
};

const userReducer = (state: User = defaultUser, action): User => {
  const { user, type, error } = action;
  switch (type) {
    case 'LOGIN_SUCCESS':
    case 'CREATE_ACCOUNT':
      return user;
    case 'LOGIN_FAIL':
      return {
        ...defaultUser,
        error,
      };
    default:
      return state;
  }
};

export default userReducer;
