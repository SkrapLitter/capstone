import TYPES from '../types';
import { AppThunk } from '../thunkType';
import { PhotoAttributes } from './photoInterface';
import axios from 'axios';

const uploadPhoto = (photo: PhotoAttributes): AppThunk => {
  return async dispatch => {
    dispatch({
      type: TYPES.UPLOAD_PHOTO,
      photo,
    });
  };
};

// TODO - figure out type for history that allows .push method
const uploadVerification = (file: FormData, id: string, history: any): void => {
  axios
    .post(`/api/photo/verificationphoto/${id}`, file, {
      headers: {
        'Content-Type': 'multipart/form-data; boundary=boundary',
      },
    })
    .then(({ data }) => {
      if (data.id) {
        history.push(`/jobs/${data.id}`);
      }
    });
};

export { uploadPhoto, uploadVerification };
