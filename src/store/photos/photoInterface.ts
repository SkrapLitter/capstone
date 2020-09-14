export interface PhotoAttributes {
  id: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  jobId: string | null;
}

export default interface Photos {
  photos: PhotoAttributes[];
}
