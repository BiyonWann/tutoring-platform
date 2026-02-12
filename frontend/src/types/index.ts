// User object returned by the backend on login
export interface User {
  name: string;
  email: string;
  photo: string;
}

// POST /auth/signup response
export interface SignupResponse {
  message: string;
  userId: string;
}

// POST /auth/login response
export interface LoginResponse {
  message: string;
  token: string;
  userId: string;
  user: User;
}

// GET /users/:userId response
export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

// Backend validation error format
export interface ApiError {
  error?: string;
  success?: boolean;
  errors?: Record<string, string[]>;
}
