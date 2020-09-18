import { PhotoAttributes } from '../photos/photoInterface';
import User from '../user/userInterface';

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
  summary?: string;
  images?: PhotoAttributes[];
  user?: User;
}

export default interface Job {
  jobs: JobAttributes[];
  count: number;
  job: JobAttributes;
}
