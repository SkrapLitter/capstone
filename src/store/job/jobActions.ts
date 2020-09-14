import TYPES from '../types';
import { AppThunk } from '../thunkType';
import Axios from 'axios';
import { booleanType } from 'aws-sdk/clients/iam';
import { JobAttributes } from './jobInterface';
import {
  dateSort,
  locationSorter,
} from '../../components/mapComponent/mapUtils';

enum jobStatus {
  'paid',
  'unpaid',
  'completed',
  'cancelled',
}
interface Jobject {
  id: string;
  name: string;
  status: jobStatus;
  price: number;
  city: string;
  state: string;
  address: string;
  reserved: boolean;
  reservedUser?: string;
  reservedUsername?: string;
  lat: number;
  lng: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  image: string;
  description: string;
  createdUser: string;
}

interface Jobs {
  type: string;
  count: number;
  jobs: Jobject[];
}
interface Job {
  type: string;
  job: Jobject;
}
const setJobs = (count: number, jobs: Jobject[]): Jobs => ({
  type: TYPES.SET_JOBS,
  count,
  jobs,
});

const setJob = (job: Jobject): Job => ({
  type: TYPES.SET_JOB,
  job,
});

const fetchJobs = (filter = '', page = 1, size = 20, type = ''): AppThunk => {
  return async dispatch => {
    let count;
    let rows;
    const data = (
      await Axios.get(
        `/api/jobs/?filter=${filter}&page=${page}&size=${size}&type=${type}`
      )
    ).data;
    if (data) {
      count = data.count;
      rows = data.rows;
    } else {
      count = 0;
      rows = [];
    }
    dispatch(setJobs(count, rows));
  };
};

const fetchJob = (id: string): AppThunk => {
  return async dispatch => {
    const { data } = await Axios.get(`/api/jobs/job/${id}`);
    dispatch(setJob(data));
  };
};

const reserveJob = (
  jobId: string,
  userId: string,
  username: string
): AppThunk => {
  return async dispatch => {
    const { status } = await Axios.put(`/api/jobs/${jobId}`, {
      type: 'reserve',
      userId,
      username,
    });
    if (status) dispatch(fetchJobs());
    else console.log('failure reserving');
  };
};

interface Location {
  lat: number;
  lng: number;
}

const locationSort = (
  jobs: JobAttributes[],
  location: Location,
  sort: booleanType
): AppThunk => {
  return dispatch => {
    if (sort === true) {
      dispatch({
        type: TYPES.LOCATION_SORT,
        jobs: locationSorter(jobs, location),
      });
    } else {
      dispatch({
        type: TYPES.LOCATION_SORT,
        jobs: dateSort(jobs),
      });
    }
  };
};

export { setJobs, fetchJobs, reserveJob, fetchJob, locationSort };
