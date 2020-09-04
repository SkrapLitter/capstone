import axios from 'axios';
import User from './userInterface';
import { AppThunk } from '../thunkType';
import { fetchUserInbox } from '../inbox/inboxActions';
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
    error,
  };
};

export const cookieLogin = (): AppThunk => {
  return async dispatch => {
    const { user } = (await axios.get('/api/auth/login')).data;
    if (user) {
      dispatch(login(user));
      dispatch(fetchUserInbox(user.id));
    }
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
      console.log(data.id);
      dispatch(login(data));
      dispatch(fetchUserInbox(data.id));
    } catch (err) {
      const { statusText } = err.response;
      dispatch(loginFail(statusText));
    }
  };
};

export const logoutThunk = (): AppThunk => {
  return async dispatch => {
    try {
      await axios.delete('/api/auth/logout');
      dispatch(logout());
    } catch (err) {
      console.error(err);
    }
  };
};
