import TYPES from '../types';
import { AppThunk } from '../thunkType';
import { AlertAction, Alert } from './alertInterface';
import Axios from 'axios';

const setAlerts = (alerts: Alert): AlertAction => ({
  type: TYPES.SET_ALERTS,
  alerts,
});
export const setAlert = (alert: Alert): AlertAction => ({
  type: TYPES.SET_ALERT,
  alert,
});

export const fetchAlerts = (userId: string): AppThunk => {
  return async dispatch => {
    if (userId) {
      const alerts = (await Axios.get(`/api/alert/all/${userId}`)).data;
      dispatch(setAlerts(alerts));
    }
  };
};
