export default interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  image: string;
  clearance: number;
  error?: string;
}
