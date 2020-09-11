import { PhotoAttributes } from '../photos/photoInterface';

export interface JobAttributes {
  id: string;
  name: string;
  status: string; // paid unpaid completed cancelled
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
  description: string;
  createdUser: string;
  images?: PhotoAttributes[];
}

export default interface Job {
  jobs: JobAttributes[];
  count: number;
  job: JobAttributes;
}
