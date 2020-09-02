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

const loginFail = (error: string) => {
  return {
    type: LOGIN_FAIL,
    error,
  };
};

export const createAccountThunk = (
  username: string,
  password: string,
  firstName: string,
  lastName: string
): AppThunk => {
  return async dispatch => {
    try {
      const payload = {
        username,
        password,
        firstName,
        lastName,
      };
      const { data } = await axios.post('/api/auth/register', payload);

      dispatch(createAccount(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const loginThunk = (username: string, password: string): AppThunk => {
  return async dispatch => {
    try {
      const payload = {
        username,
        password,
      };
      const { data } = await axios.post('/api/auth/login', payload);

      dispatch(login(data));
    } catch (err) {
      const { statusText } = err.response;
      dispatch(loginFail(statusText));
    }
  };
};
