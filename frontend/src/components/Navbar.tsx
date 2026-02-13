import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

// show different links based on login state
export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="Tutoring Platform" className="navbar-logo" />
      </Link>

      <div className="navbar-links">
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="navbar-link">
              <span className="navbar-link-icon">📊</span>
              Dashboard
            </Link>
            <div className="navbar-user-info">
              <div className="navbar-user-avatar">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <span className="navbar-user-name">{user?.name || "User"}</span>
            </div>
            <button onClick={handleLogout} className="navbar-logout-btn">
              <span className="navbar-logout-icon">🚪</span>
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link navbar-link-secondary">
              Log In
            </Link>
            <Link to="/signup" className="navbar-link navbar-link-primary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
