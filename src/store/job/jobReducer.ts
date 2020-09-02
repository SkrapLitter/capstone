import TYPES from '../types';
import Job, { JobAttributes } from './jobInterface';

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
        paidJobs: action.jobs.filter(
          (job: JobAttributes) => job.status === 'paid'
        ),
        unpaidJobs: action.jobs.filter(
          (job: JobAttributes) => job.status === 'unpaid'
        ),
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
