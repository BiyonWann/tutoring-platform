import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User } from "../types";

// Shape of the auth context — what components can access
interface AuthContextType {
  token: string | null;
  user: User | null;
  userId: string | null;
  isLoggedIn: boolean;
  saveAuth: (token: string, userId: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Helper to check if token is valid (not empty and not "null" string)
function isValidToken(token: string | null): boolean {
  return !!token && token.trim() !== "" && token !== "null";
}

// Wrapping the auth state
export function AuthProvider({ children }: { children: ReactNode }) {
  // Load saved auth data from localStorage 
  const [token, setToken] = useState<string | null>(() => {
    const saved = localStorage.getItem("token");
    return isValidToken(saved) ? saved : null;
  });
  const [userId, setUserId] = useState<string | null>(() => {
    const saved = localStorage.getItem("userId");
    return saved && saved !== "null" ? saved : null;
  });
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // Validate token on mount and clear invalid tokens
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!isValidToken(savedToken)) {
      // Clear invalid token and related data
      setToken(null);
      setUserId(null);
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("user");
    }
  }, []);

  const isLoggedIn = isValidToken(token);

  // Save auth data to state and localStorage after login
  function saveAuth(token: string, userId: string, user: User) {
    if (!isValidToken(token)) {
      throw new Error("Invalid token provided");
    }
    setToken(token);
    setUserId(userId);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("user", JSON.stringify(user));
  }

  // Clear auth data on logout
  function logout() {
    setToken(null);
    setUserId(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider
      value={{ token, user, userId, isLoggedIn, saveAuth, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Acess auth state in any component 
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
