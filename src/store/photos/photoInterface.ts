import User from '../user/userInterface';

export interface PhotoAttributes {
  id: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  jobId: string | null;
  user?: User;
}

export default interface Photos {
  photos: PhotoAttributes[];
}
