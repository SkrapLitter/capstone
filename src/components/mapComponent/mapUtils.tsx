import { JobAttributes } from '../../store/job/jobInterface';

interface Location {
  lat: number;
  lng: number;
}

export const locationSorter = (
  jobs: JobAttributes[],
  location: Location
): JobAttributes[] => {
  return jobs.sort((a, b) => {
    // a
    const aXDiff = Math.abs(location.lat - a.lat);
    const aYDiff = Math.abs(location.lng - a.lng);
    const aDistance = Math.sqrt(aXDiff ** 2 + aYDiff ** 2);
    // b
    const bXDiff = Math.abs(location.lat - b.lat);
    const bYDiff = Math.abs(location.lng - b.lng);
    const bDistance = Math.sqrt(bXDiff ** 2 + bYDiff ** 2);
    return aDistance - bDistance;
  });
};

export const dateSort = (jobs: JobAttributes[]): JobAttributes[] => {
  return jobs.sort((a, b) => {
    return Number(a.updatedAt) - Number(b.updatedAt);
  });
};
