import TYPES from '../types';
import { AppThunk } from '../thunkType';
import { AlertAction, Alert } from './alertInterface';
import Axios from 'axios';

const setAlerts = (alerts: Alert, newAlerts: Alert): AlertAction => ({
  type: TYPES.SET_ALERTS,
  alerts,
  newAlerts,
});
const setNewAlerts = (newAlerts: Alert): AlertAction => ({
  type: TYPES.SET_NEW_ALERTS,
  newAlerts,
});

export const fetchAlerts = (userId: string): AppThunk => {
  return async dispatch => {
    const alerts = (await Axios.get(`api/alert/all/${userId}`)).data;
    let newAlerts;
    if (alerts && alerts.length) {
      newAlerts = alerts.filter(alert => alert.seen === false);
    }
    console.log(alerts, newAlerts);
    dispatch(setAlerts(alerts, newAlerts));
  };
};
export const fetchNewAlerts = (userId: string): AppThunk => {
  return async dispatch => {
    const alerts = (await Axios.get(`api/alert/user/${userId}`)).data;
    dispatch(setNewAlerts(alerts));
  };
};

export const clearAlerts = (alerts: Alert[], userId: string): AppThunk => {
  return async dispatch => {
    await alerts.forEach(alert => {
      Axios.put(`/api/alert/${alert.id}`);
    });
    dispatch(fetchAlerts(userId));
  };
};