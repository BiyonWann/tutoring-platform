import type { UserProfile } from "../types";

// Base URL for the backend 
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// Helper to get the saved JWT token from localStorage
function getToken(): string | null {
  return localStorage.getItem("token");
}

// GET /users/:userId — Fetch a single user's profile
export async function getUserProfile(userId: string): Promise<UserProfile> {
  const res = await fetch(`${API_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}

// GET /users — Fetch all users
export async function getAllUsers(): Promise<UserProfile[]> {
  const res = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

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

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}
