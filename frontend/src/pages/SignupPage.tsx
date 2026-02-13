import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../api/authApi";

type UserRole = "STUDENT" | "TUTOR";

// Signup page — POST /auth/signup
export default function SignupPage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("STUDENT");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setLoading(true);

    try {
      // Call signup API endpoint
      await signup(email, password, firstName, lastName, role);

      // Redirect to login page after successful signup
      navigate("/login");
    } catch (err: any) {
      // Handle validation errors (field-specific) from backend
      if (err.errors) {
        setFieldErrors(err.errors);
      } else {
        setError(err.error || "Signup failed");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Create Your Account</h1>
          <p className="auth-subtitle">Join us as a tutor or student</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error-message">{error}</div>}

          {/* Role Selection */}
          <div className="auth-role-selector">
            <label className="auth-role-label">I want to join as:</label>
            <div className="auth-role-options">
              <button
                type="button"
                className={`auth-role-btn ${role === "TUTOR" ? "active" : ""}`}
                onClick={() => setRole("TUTOR")}
              >
                <span className="auth-role-icon">👨‍🏫</span>
                <span className="auth-role-text">Tutor</span>
              </button>
              <button
                type="button"
                className={`auth-role-btn ${role === "STUDENT" ? "active" : ""}`}
                onClick={() => setRole("STUDENT")}
              >
                <span className="auth-role-icon">🎓</span>
                <span className="auth-role-text">Student</span>
              </button>
            </div>
          </div>

          <div className="auth-form-row">
            <div className="auth-form-group">
              <label className="auth-label">First Name</label>
              <input
                type="text"
                className="auth-input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="John"
              />
              {fieldErrors.firstName && (
                <span className="auth-field-error">{fieldErrors.firstName[0]}</span>
              )}
            </div>

            <div className="auth-form-group">
              <label className="auth-label">Last Name</label>
              <input
                type="text"
                className="auth-input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Doe"
              />
              {fieldErrors.lastName && (
                <span className="auth-field-error">{fieldErrors.lastName[0]}</span>
              )}
            </div>
          </div>

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
            {fieldErrors.email && (
              <span className="auth-field-error">{fieldErrors.email[0]}</span>
            )}
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
            {fieldErrors.password && (
              <span className="auth-field-error">{fieldErrors.password[0]}</span>
            )}
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="auth-loading-spinner"></span>
                Creating account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>

          <p className="auth-link-text">
            Already have an account? <Link to="/login" className="auth-link">Log In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
