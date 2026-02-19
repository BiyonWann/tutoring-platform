import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Code, User } from "lucide-react";

// show different links based on login state
export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-md border-b-2 border-primary/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-primary rounded-lg p-2 shadow-lg">
              <Code className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Rainfall</h1>
              <p className="text-sm text-gray-600">Expert Tutor-Led Python Courses</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary font-medium transition-colors">
                  Dashboard
                </Link>
                <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-gray-800">{user?.name || "User"}</p>
                    <p className="text-xs text-gray-500">View Profile</p>
                  </div>
                  <div className="bg-primary rounded-full p-2 shadow-md">
                    <User className="w-5 h-5 text-primary-foreground" />
                  </div>
                </button>
                <button 
                  onClick={handleLogout} 
                  className="px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-medium transition-colors border border-red-200"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary font-medium transition-colors">
                  Log In
                </Link>
                <Link to="/signup" className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
