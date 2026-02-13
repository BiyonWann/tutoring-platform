import type { SignupResponse, LoginResponse } from "../types";

// Base URL for the backend 
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// POST /auth/signup — Create a new user account
export async function signup(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  role: "STUDENT" | "TUTOR" = "STUDENT"
): Promise<SignupResponse> {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, firstName, lastName, role }),
  });

  // If backend returns an error, throw it so the UI can display it
  if (!res.ok) {
    let errorData;
    try {
      errorData = await res.json();
    } catch {
      errorData = { error: `HTTP ${res.status}: ${res.statusText}` };
    }
    throw errorData;
  }

  const data = await res.json();
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

  if (!res.ok) {
    let errorData;
    try {
      errorData = await res.json();
    } catch {
      errorData = { error: `HTTP ${res.status}: ${res.statusText}` };
    }
    throw errorData;
  }

  const data = await res.json();
  return data;
}
