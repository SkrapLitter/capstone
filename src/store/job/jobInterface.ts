import { PhotoAttributes } from '../photos/photoInterface';
import User from '../user/userInterface';

export interface JobAttributes {
  id: string;
  name: string;
  status: string; // funded pending volunteer completed cancelled pendingVerification
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
  funded?: number;
  images?: Array<PhotoAttributes>;
  summary?: string;
  user?: User;
  verifications?: PhotoAttributes[];
}
export interface UserJobs {
  completed?: Array<JobAttributes>;
  cancelled?: Array<JobAttributes>;
  pendingVerification?: Array<JobAttributes>;
  pending?: Array<JobAttributes>;
  active?: Array<JobAttributes>;
  reservedJobs?: Array<JobAttributes>;
  completedJobs?: Array<JobAttributes>;
}

export default interface Job {
  jobs: JobAttributes[];
  count: number;
  job: JobAttributes;
  userJobs: UserJobs;
}
