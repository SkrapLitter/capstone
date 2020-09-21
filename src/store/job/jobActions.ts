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

const fetchMapJobs = (
  north: number,
  south: number,
  east: number,
  west: number
): AppThunk => {
  return async dispatch => {
    const { data } = await Axios.get(
      `/api/jobs/map/?north=${north}&south=${south}&east=${east}&west=${west}`
    );
    dispatch(setJobs(0, data));
  };
};

const fetchJob = (id: string): AppThunk => {
  return async dispatch => {
    const { data } = await Axios.get(`/api/jobs/job/${id}`);
    console.log(data);
    dispatch(setJob(data));
  };
};

const reserveJob = (jobId: string): AppThunk => {
  return async (dispatch): Promise<any> => {
    try {
      const { data } = await Axios.put(`/api/jobs/${jobId}`, {
        type: 'reserve',
      });
      if (data.status) dispatch(setJob(data.job));
    } catch (e) {
      if (e.response.data.shouldUpdateStore) {
        dispatch(setJob(e.response.data.job));
      }
      throw e.response.data.message;
    }
  };
};

const unreserveJob = (jobId: string): AppThunk => {
  return async (dispatch): Promise<any> => {
    try {
      const { data } = await Axios.put(`/api/jobs/${jobId}`, {
        type: 'unreserve',
      });
      if (data.status) dispatch(setJob(data.job));
    } catch (e) {
      console.log(e.response.data);
      if (e.response.data.shouldUpdateStore) {
        dispatch(setJob(e.response.data.job));
      }
      console.log(e.response.data.message);
    }
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

const addPhotoToJob = (id: string, file: FormData): AppThunk => {
  return async dispatch => {
    Axios.post(`/api/photo/jobphoto/${id}`, file, {
      headers: {
        'Content-Type': 'multipart/form-data; boundary=boundary',
      },
    })
      .then(({ data }) => {
        dispatch(setJob(data));
      })
      .catch(console.log);
  };
};

export {
  setJobs,
  fetchJobs,
  reserveJob,
  fetchJob,
  unreserveJob,
  locationSort,
  fetchMapJobs,
  addPhotoToJob,
};
