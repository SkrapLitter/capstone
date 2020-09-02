export interface JobAttributes {
  id: string;
  name: string;
  status: string;
  price: number;
  city: string;
  state: string;
  address: string;
  reserved: boolean;
  reservedUser?: string;
  lat: number;
  lng: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  image: string;
  description: string;
}

export default interface Job {
  paidJobs: JobAttributes[];
  unpaidJobs: JobAttributes[];
  allJobs: JobAttributes[];
  completedJobs: JobAttributes[];
  cancelledJobs: JobAttributes[];
  filter: string;
}
