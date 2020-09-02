import TYPES from '../types';
import Job from './jobInterface';

const defaultJobs: Job = {
  paidJobs: [],
  unpaidJobs: [],
  completedJobs: [],
  cancelledJobs: [],
  allJobs: [],
  filter: '',
};

const jobReducer = (state: Job = defaultJobs, action): Job => {
  switch (action.type) {
    case TYPES.SET_JOBS:
      return {
        ...state,
        allJobs: action.jobs,
        paidJobs: action.paid,
        unpaidJobs: action.unpaid,
      };
    case TYPES.SET_JOB_FILTER:
      return {
        ...state,
        filter: action.filter,
      };
    case TYPES.FILTER_JOBS:
      return {
        ...state,
        allJobs: action.jobs,
      };
    default:
      return state;
  }
};

export default jobReducer;
