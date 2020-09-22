import TYPES from '../types';
import Job from './jobInterface';
import { AnyAction } from 'redux';

const defaultJobs: Job = {
  jobs: [],
  count: 0,
  job: {
    id: '',
    name: '',
    status: '',
    price: 0,
    city: '',
    state: '',
    address: '',
    reserved: false,
    reservedUser: '',
    reservedUsername: '',
    lat: 0,
    lng: 0,
    createdAt: '',
    updatedAt: '',
    userId: '',
    images: [],
    description: '',
    createdUser: '',
    funded: 0,
  },
  userJobs: {
    completed: [],
    pending: [],
    pendingVerification: [],
    cancelled: [],
    active: [],
  },
};

const jobReducer = (state: Job = defaultJobs, action: AnyAction): Job => {
  switch (action.type) {
    case TYPES.SET_JOBS:
      return {
        ...state,
        jobs: action.jobs,
        count: action.count,
      };
    case TYPES.SET_JOB:
      return {
        ...state,
        job: action.job,
      };
    case TYPES.LOCATION_SORT:
      return {
        ...state,
        jobs: action.jobs,
      };
    case TYPES.SET_USER_JOBS:
      return {
        ...state,
        userJobs: action.userJobs,
      };
    default:
      return state;
  }
};

export default jobReducer;
