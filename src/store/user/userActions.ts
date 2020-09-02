import axios from 'axios';
import User from './userInterface';
import { AppThunk } from '../thunkType';
import TYPES from '../types';

const createAccount = (user: User) => {
  return {
    type: TYPES.CREATE_ACCOUNT,
    user,
  };
};
const login = (user: User) => {
  return {
    type: TYPES.LOGIN_SUCCESS,
    user,
  };
};
const logout = () => {
  return {
    type: TYPES.LOGOUT,
  };
};

const loginFail = (error: string) => {
  return {
    type: TYPES.LOGIN_FAIL,
    error
  };
};

export const logoutUser = (): AppThunk => {
  return async dispatch => {
    const { status } = (await axios.delete('/api/auth/logout')).data;
    if (status) dispatch(logout());
    else console.log('error logging out');
  };
};

export const cookieLogin = (): AppThunk => {
  return async dispatch => {
    const { user } = (await axios.get('/api/auth/login')).data;
    if (user) dispatch(login(user));
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
