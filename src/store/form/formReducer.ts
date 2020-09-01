import Form from './formInterface';
import TYPES from '../types';

const defaultForm: Form = {
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  image: '',
  jobName: '',
  jobAddress: '',
  jobCity: '',
  jobZipcode: '',
  jobPrice: '',
  clearance: 1,
};

const formReducer = (state: Form = defaultForm, action): Form => {
  switch (action.type) {
    case TYPES.UPDATE_FORM: {
      return {
        ...state,
        [action.name]: action.value,
      };
    }
    case TYPES.CLEAR_FORM:
      return defaultForm;
    default:
      return state;
  }
};

export default formReducer;
