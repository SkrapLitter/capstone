import TYPES from '../types';
import { AppThunk } from '../thunkType';
import Axios from 'axios';

enum jobStatus {
  'paid',
  'unpaid',
  'completed',
  'cancelled',
}
interface Jobject {
  state: string;
  address: string;
  name: string;
  price: number;
  city: string;
  reserved: boolean;
  reservedUser: string;
  status: jobStatus;
}

interface Jobs {
  type: string;
  jobs?: Jobject[];
  paid?: Jobject[];
  unpaid?: Jobject[];
  filter?: string;
}
interface reserveJob {
  jobId: string;
  userId: string;
}
const setJobs = (
  jobs: Jobs['jobs'],
  paid: Jobs['paid'],
  unpaid: Jobs['unpaid']
): Jobs => ({
  type: TYPES.SET_JOBS,
  jobs,
  paid,
  unpaid,
});
const setJobFilter = (filter: string): Jobs => ({
  type: TYPES.SET_JOB_FILTER,
  filter,
});
const filterJobs = (jobs: Jobs['jobs']): Jobs => ({
  type: TYPES.FILTER_JOBS,
  jobs,
});
const fetchJobs = (): AppThunk => {
  return async dispatch => {
    const { jobs, paid, unpaid } = (await Axios.get('/api/jobs')).data;
    dispatch(setJobs(jobs, paid, unpaid));
  };
};
const reserveJob = (
  jobId: reserveJob['jobId'],
  userId: reserveJob['userId']
): AppThunk => {
  return async dispatch => {
    const { status } = await Axios.put(`/api/jobs/${jobId}`, {
      type: 'reserve',
      userId,
    });
    if (status) dispatch(fetchJobs);
    else console.log('failure reserving');
  };
};

const sendFilterJobs = (filter: string): AppThunk => {
  return async dispatch => {
    dispatch(setJobFilter(filter));
    const { jobs } = (await Axios.get(`/api/jobs/?filter=${filter}`)).data;
    dispatch(filterJobs(jobs));
  };
};

const clearJobs = () => ({
  type: TYPES.CLEAR_JOB_FILTER,
});

const clearJobFilter = (): AppThunk => {
  return dispatch => {
    dispatch(clearJobs());
    dispatch(fetchJobs());
  };
};

export { setJobs, fetchJobs, reserveJob, sendFilterJobs, clearJobFilter };
