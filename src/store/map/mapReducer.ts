import MAP_TYPES from './mapTypes';
import MapInterface from './mapInterface';

const defaultMap: MapInterface = {
  center: { lat: 40.64, lng: -74.08 },
  zoom: 11,
  key: '',
};

export const mapReducer = (
  state: MapInterface = defaultMap,
  action
): MapInterface => {
  switch (action.type) {
    case MAP_TYPES.GET_MAP:
      return {
        ...state,
        key: action.key,
      };
    case MAP_TYPES.GET_LOCAL_MAP:
      return {
        ...state,
        key: action.key,
        center: action.center,
        zoom: 13,
      };
    default:
      return state;
  }
};
