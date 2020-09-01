import TYPES from '../types';
import View from './viewInterface';

const defaultView: View = {
  view: 'paid',
};

const viewReducer = (state: View = defaultView, action): View => {
  switch (action.type) {
    case TYPES.SET_VIEW:
      return {
        ...state,
        view: action.view,
      };
    case TYPES.CLEAR_VIEW:
      return defaultView;
    default:
      return state;
  }
};

export default viewReducer;
