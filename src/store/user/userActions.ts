import axios from 'axios';
import User from './userInterface';
import { AppThunk } from '../thunkType';
import TYPES from '../types';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';

const createAccount = (user: User) => {
  return {
    type: TYPES.CREATE_ACCOUNT,
    user,
  };
};
const login = (user: User) => {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
};

const loginFail = () => {
  return {
    type: LOGIN_FAIL,
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
        /* eslint-disable no-shadow */
        const { id, username, firstName, lastName, clearance, image } = data;
        const user = {
          id,
          username,
          firstName,
          lastName,
          clearance,
          image,
        };
        dispatch(createAccount(user));
      })
      .catch(console.error);
  };
};

export const loginThunk = (username: string, password: string): AppThunk => {
  return dispatch => {
    return axios
      .post('/api/auth/login', { username, password })
      .then(({ data }) => {
        const { id, username, firstName, lastName, clearance, image } = data;
        const user = {
          id,
          username,
          firstName,
          lastName,
          clearance,
          image,
        };
        console.log(data);
        dispatch(login(user));
      })
      .catch(e => {
        dispatch(loginFail());
        throw e;
      });
  };
};
