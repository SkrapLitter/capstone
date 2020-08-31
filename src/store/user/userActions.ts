import axios from 'axios';
import User from './userInterface';
import { AppThunk } from '../thunkType';

const CREATE_ACCOUNT = 'CREATE_ACCOUNT';

const createAccount = (user: User) => {
  return {
    type: CREATE_ACCOUNT,
    user,
  };
};

export const createAccountThunk = (
  username: string,
  password: string,
  firstName: string,
  lastName: string
): AppThunk => {
  return dispatch => {
    axios
      .post('/api/auth/register', {
        username,
        password,
        firstName,
        lastName,
      })
      .then(({ data }) => {
        const user = {
          id: data.id,
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          clearance: data.clearance,
          image: data.image,
        };
        dispatch(createAccount(user));
      })
      .catch(console.error);
  };
};
