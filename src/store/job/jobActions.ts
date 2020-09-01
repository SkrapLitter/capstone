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
  jobs: Jobject[];
  paid: Jobject[];
  unpaid: Jobject[];
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

const fetchJobs = (): AppThunk => {
  return async dispatch => {
    const { jobs, paid, unpaid } = (await Axios.get('/api/jobs')).data;
    dispatch(setJobs(jobs, paid, unpaid));
  };
};

export { setJobs, fetchJobs };
