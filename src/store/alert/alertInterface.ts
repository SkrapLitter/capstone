export interface AlertAction {
  type: string;
  alerts?: Alert;
  alert?: Alert;
}

export interface Alert {
  id: string;
  subject: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}
