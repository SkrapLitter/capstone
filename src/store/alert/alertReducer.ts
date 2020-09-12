import { AlertReducer } from './alertInterface';
import TYPES from '../types';

const alertState: AlertReducer = {
  alerts: [],
  newAlerts: [],
};

const alertReducer = (
  state: AlertReducer = alertState,
  action
): AlertReducer => {
  switch (action.type) {
    case TYPES.SET_ALERTS:
      console.log(action.alerts, action.newAlerts);
      return {
        ...state,
        alerts: action.alerts,
        newAlerts: action.newAlerts,
      };
    case TYPES.SET_NEW_ALERTS:
      return {
        ...state,
        newAlerts: [action.newAlerts, ...state.newAlerts],
      };
    default:
      return state;
  }
};

export default alertReducer;
