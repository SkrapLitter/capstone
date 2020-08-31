export interface Coordinates {
  lat: number;
  lng: number;
}

export default interface MapInterface {
  center: Coordinates;
  zoom: number;
  key: string;
}
