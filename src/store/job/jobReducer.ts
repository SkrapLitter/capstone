import TYPES from '../types';
import Job from './jobInterface';

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
    image: '',
    description: '',
    createdUser: '',
  },
};

const jobReducer = (state: Job = defaultJobs, action): Job => {
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
    default:
      return state;
  }
};

export default jobReducer;
