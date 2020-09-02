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

const loginFail = () => {
  return {
    type: TYPES.LOGIN_FAIL,
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
