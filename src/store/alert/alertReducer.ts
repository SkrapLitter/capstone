import TYPES from '../types';

const alertState = [];

const alertReducer = (state = alertState, action) => {
  switch (action.type) {
    case TYPES.SET_ALERTS:
      return [...action.alerts];
    case TYPES.SET_ALERT:
      return [...state, action.alert];
    default:
      return state;
  }
};

export default alertReducer;
