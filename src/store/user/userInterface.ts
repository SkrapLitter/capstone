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
  stripeAccount?: string;
  stripeDashBoard?: string;
  onboarding?: boolean;
}
