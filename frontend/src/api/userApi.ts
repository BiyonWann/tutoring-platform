import type { UserProfile } from "../types";

// Base URL for the backend 
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// Helper to get the saved JWT token from localStorage
function getToken(): string {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }
  return token;
}

// GET /users/:userId — Fetch a single user's profile
export async function getUserProfile(userId: string): Promise<UserProfile> {
  const res = await fetch(`${API_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
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

// GET /users — Fetch all users
export async function getAllUsers(): Promise<UserProfile[]> {
  const res = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
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

// DELETE /users/:userId 
export async function deleteUser(userId: string): Promise<{ message: string }> {
  const res = await fetch(`${API_URL}/users/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
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
