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
    <div className="page">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Log In</h2>

        {error && <p className="error">{error}</p>}

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>

        <p className="link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
