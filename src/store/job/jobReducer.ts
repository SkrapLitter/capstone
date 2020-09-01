import TYPES from '../types';
import Job from './jobInterface';

const defaultJobs: Job = {
  paidJobs: [],
  unpaidJobs: [],
  completedJobs: [],
  cancelledJobs: [],
  allJobs: [],
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
    default:
      return state;
  }
};

export default jobReducer;
