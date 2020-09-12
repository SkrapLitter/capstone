import TYPES from '../types';
import { AppThunk } from '../thunkType';
import { PhotoAttributes } from './photoInterface';

const uploadPhoto = (photo: PhotoAttributes): AppThunk => {
  return async dispatch => {
    dispatch({
      type: TYPES.UPLOAD_PHOTO,
      photo,
    });
  };
};

export { uploadPhoto };
