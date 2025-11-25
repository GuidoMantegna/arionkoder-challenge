export interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
  centerId: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  centerId: string;
  name: string;
  email: string;
  date: string;
  time: string;
  serviceName: string;
  price: number;
  duration: number;
  createdAt: string;
}

export interface Center {
  id: string;
  name: string;
  brief: string;
  description: string;
  image: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}
