import TYPES from '../types';
import Photos from './photoInterface';

const defaultPhotos: Photos = {
  photos: [],
};

const photoReducer = (state: Photos = defaultPhotos, action): Photos => {
  switch (action.type) {
    case TYPES.UPLOAD_PHOTO:
      return {
        ...state,
        photos: [...state.photos, action.photo],
      };
    default:
      return state;
  }
};

export default photoReducer;
