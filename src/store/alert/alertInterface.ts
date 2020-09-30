export interface AlertAction {
  type: string;
  alerts?: Alert;
  newAlerts?: Alert;
  alert?: Alert;
}

export interface Alert {
  id: string;
  subject: string;
  global: boolean;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface AlertReducer {
  alerts: Alert[];
  newAlerts: Alert[];
}
