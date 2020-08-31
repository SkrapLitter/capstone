import MAP_TYPES from './mapTypes';
import { Coordinates } from './mapInterface';

const axios = require('axios');

export const getMap = (localCoord: Coordinates) => dispatch => {
  axios.get('/api/map/getmap').then(({ data }) => {
    if (localCoord) {
      dispatch({
        type: MAP_TYPES.GET_LOCAL_MAP,
        key: data,
        center: localCoord,
      });
    } else {
      dispatch({
        type: MAP_TYPES.GET_MAP,
        key: data,
      });
    }
  });
};
