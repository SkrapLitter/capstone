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
}
