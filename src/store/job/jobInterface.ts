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
  reservedUsername?: string;
  lat: number;
  lng: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  image: string;
  description: string;
  createdUser: string;
}

export default interface Job {
  jobs: JobAttributes[];
  count: number;
  job: JobAttributes;
}
