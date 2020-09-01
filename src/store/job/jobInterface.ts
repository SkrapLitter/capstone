export interface JobAttributes {
  id: string;
  name: string;
  status: string;
  price: number;
  city: string;
  state: string;
  address: string;
  reserverd: boolean;
  reservedUser?: string;
  lat: number;
  lng: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export default interface Job {
  paidJobs: JobAttributes[];
  unpaidJobs: JobAttributes[];
  allJobs: JobAttributes[];
  completedJobs: JobAttributes[];
  cancelledJobs: JobAttributes[];
}
