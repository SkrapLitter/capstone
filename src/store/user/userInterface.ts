export default interface User {
  id?: string;
  username: string;
  firstName: string;
  lastName: string;
  image?: string;
  clearance?: number;
  password?: string;
  error?: string;
  stripe?: string;
  balance?: number;
  payments?: Array<Payment>;
}
interface PhotoAttributes {
  id: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  jobId: string | null;
  user?: User;
}
interface JobAttributes {
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
interface Payment {
  id: string;
  amount: number;
  subject: string;
  type: string;
  chargeId: string;
  jobId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  job?: Array<JobAttributes>;
}
