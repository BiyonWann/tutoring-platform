import type { SignupResponse, LoginResponse } from "../types";

// Base URL for the backend 
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// POST /auth/signup — Create a new user account
export async function signup(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<SignupResponse> {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, firstName, lastName }),
  });

  const data = await res.json();

  // If backend returns an error, throw it so the UI can display it
  if (!res.ok) {
    throw data;
  }

  return data;
}

// POST /auth/login: Login and receive a JWT token
export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}
