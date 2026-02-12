import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserProfile } from "../api/userApi";
import type { UserProfile } from "../types";

// Dashboard page (after login)
// Calls GET /users/:userId to fetch full profile
export default function DashboardPage() {
  const { user, userId } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the user's full profile from the backend on mount
  useEffect(() => {
    async function fetchProfile() {
      if (!userId) return;

      try {
        const data = await getUserProfile(userId);
        setProfile(data);
      } catch (err: any) {
        setError(err.error || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [userId]);

  if (loading) return <div className="page"><p>Loading...</p></div>;
  if (error) return <div className="page"><p className="error">{error}</p></div>;

  return (
    <div className="page">
      <div className="card">
        <h2>Welcome, {user?.name || "User"}</h2>

        {profile && (
          <div className="profile-details">
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
            <p><strong>Member since:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}
