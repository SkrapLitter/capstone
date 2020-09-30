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
      return {
        ...state,
        alerts: action.alerts,
        newAlerts: action.newAlerts,
      };
    case TYPES.SET_NEW_ALERTS:
      return {
        ...state,
        newAlerts: action.newAlerts,
      };
    case TYPES.SET_ALERT:
      return {
        ...state,
        newAlerts: [...state.newAlerts, action.alert],
      };
    default:
      return state;
  }
};

export default alertReducer;
