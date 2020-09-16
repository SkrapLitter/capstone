import axios from 'axios';
import User from './userInterface';
import { AppThunk } from '../thunkType';
import { fetchUserInbox } from '../inbox/inboxActions';
import { fetchAlerts } from '../alert/alertActions';
import TYPES from '../types';

const updateAccount = (user: User) => {
  return {
    type: TYPES.UPDATE_ACCOUNT,
    user,
  };
};

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

const accountUpdateFail = (error: string) => {
  return {
    type: TYPES.UPDATE_ACCOUNT_FAIL,
    error,
  };
};

export const cookieLogin = (): AppThunk => {
  return async dispatch => {
    const { user } = (await axios.get('/api/auth/login')).data;
    if (user) {
      dispatch(login(user));
      dispatch(fetchUserInbox(user.id));
      dispatch(fetchAlerts(user.id));
    }
  };
};

export const updateAccountThunk = (id: string, user: User): AppThunk => {
  return async dispatch => {
    try {
      const { data } = await axios.put(`/api/auth/${id}`, user);
      dispatch(updateAccount(data));
    } catch (err) {
      console.error(err);
      const { statusText } = err.response;
      dispatch(accountUpdateFail(statusText));
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
      const account = (
        await axios.post(`/api/user/stripe/onboarding/${data.id}`)
      ).data;
      window.location = account;
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
      dispatch(fetchUserInbox(data.id));
      dispatch(fetchAlerts(data.id));
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
