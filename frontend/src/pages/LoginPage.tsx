import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

// Login page — POST /auth/login
export default function LoginPage() {
  const navigate = useNavigate();
  const { saveAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Call the login API endpoint
      const data = await login(email, password);

      // Save token/user info to context + localStorage
      saveAuth(data.token, data.userId, data.user);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err: any) {
      // Display error from backend
      setError(err.error || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue to your dashboard</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error-message">{error}</div>}

          <div className="auth-form-group">
            <label className="auth-label">Email</label>
            <input
              type="email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="john.doe@example.com"
            />
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Password</label>
            <input
              type="password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="auth-loading-spinner"></span>
                Logging in...
              </>
            ) : (
              "Log In"
            )}
          </button>

          <p className="auth-link-text">
            Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
