import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../api/authApi";

// Signup page — POST /auth/signup
export default function SignupPage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      await signup(email, password, firstName, lastName);

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
    <div className="page">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        {error && <p className="error">{error}</p>}

        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        {fieldErrors.firstName && (
          <p className="error">{fieldErrors.firstName[0]}</p>
        )}

        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        {fieldErrors.lastName && (
          <p className="error">{fieldErrors.lastName[0]}</p>
        )}

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {fieldErrors.email && (
          <p className="error">{fieldErrors.email[0]}</p>
        )}

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {fieldErrors.password && (
          <p className="error">{fieldErrors.password[0]}</p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="link">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
}
