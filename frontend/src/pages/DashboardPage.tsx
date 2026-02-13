import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserProfile } from "../api/userApi";
import type { UserProfile } from "../types";

// Get time-based greeting
function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

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

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-error">
          <p className="error">{error}</p>
        </div>
      </div>
    );
  }

  const greeting = getTimeBasedGreeting();
  const tutorName = profile ? `${profile.firstName} ${profile.lastName}` : user?.name || "Tutor";

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-welcome">
          <h1 className="dashboard-greeting">{greeting}, {tutorName}!</h1>
          <p className="dashboard-subtitle">Welcome back to your tutoring dashboard</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-grid">
          {/* Overview Cards */}
          <div className="dashboard-card dashboard-card-primary">
            <div className="dashboard-card-icon">📚</div>
            <div className="dashboard-card-content">
              <h3>Your Sessions</h3>
              <p className="dashboard-card-value">0</p>
              <p className="dashboard-card-label">Upcoming sessions</p>
            </div>
          </div>

          <div className="dashboard-card dashboard-card-secondary">
            <div className="dashboard-card-icon">👥</div>
            <div className="dashboard-card-content">
              <h3>Students</h3>
              <p className="dashboard-card-value">0</p>
              <p className="dashboard-card-label">Active students</p>
            </div>
          </div>

          <div className="dashboard-card dashboard-card-tertiary">
            <div className="dashboard-card-icon">⭐</div>
            <div className="dashboard-card-content">
              <h3>Rating</h3>
              <p className="dashboard-card-value">—</p>
              <p className="dashboard-card-label">Average rating</p>
            </div>
          </div>

          <div className="dashboard-card dashboard-card-quaternary">
            <div className="dashboard-card-icon">💰</div>
            <div className="dashboard-card-content">
              <h3>Earnings</h3>
              <p className="dashboard-card-value">$0</p>
              <p className="dashboard-card-label">This month</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="dashboard-main">
          <div className="dashboard-section">
            <h2 className="dashboard-section-title">Quick Actions</h2>
            <div className="dashboard-actions">
              <button className="dashboard-action-btn">
                <span className="dashboard-action-icon">➕</span>
                <span>Create New Session</span>
              </button>
              <button className="dashboard-action-btn">
                <span className="dashboard-action-icon">📅</span>
                <span>View Calendar</span>
              </button>
              <button className="dashboard-action-btn">
                <span className="dashboard-action-icon">📝</span>
                <span>Update Profile</span>
              </button>
            </div>
          </div>

          <div className="dashboard-section">
            <h2 className="dashboard-section-title">Recent Activity</h2>
            <div className="dashboard-empty-state">
              <div className="dashboard-empty-icon">📋</div>
              <p>No recent activity to display</p>
              <p className="dashboard-empty-subtitle">Your activity will appear here once you start tutoring</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
