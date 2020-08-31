import User from './userInterface';

const defaultUser: User = {
  id: '1',
  username: 'guest',
  firstName: 'Guesty',
  lastName: 'McNotLoggedIn',
  image: '',
  clearance: 0,
};

const userReducer = (state: User = defaultUser, action): User => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;
