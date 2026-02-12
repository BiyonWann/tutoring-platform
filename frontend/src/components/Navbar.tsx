import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
        Tutoring Platform
      </Link>

      <div className="navbar-links">
        {isLoggedIn ? (
          <>
            <span className="navbar-user">{user?.name}</span>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout} className="btn-logout">
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
