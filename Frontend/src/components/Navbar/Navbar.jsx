import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./Navbar.css";

import Icon from "../Icon";

import { useAuth } from "../../context/AuthContext";

function Navbar({ darkMode, setDarkMode, onOpenPreferences }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const isHomePage = location.pathname === "/";
  const isMovieDetails = location.pathname.startsWith("/movie/");

  const handleProfileClick = () => {
    setShowProfileMenu((prev) => !prev);
  };

  const handleProfile = () => {
    setShowProfileMenu(false);
    navigate("/profile");
  };

  const handleCart = () => {
    setShowProfileMenu(false);
    navigate("/cart");
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate("/");
  };

  return (
    <nav
      className={`navbar ${
        isHomePage || isMovieDetails ? "navbar-home" : "navbar-page"
      }`}
    >
      <div className="navbar-logo">
        <img src="/Logo2_WB.PNG" alt="CineLend Logo" />
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/discover">Discover</Link>
        </li>

        <li>
          <button
            type="button"
            className="navbar-preference"
            onClick={onOpenPreferences}
          >
            Preference
          </button>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>

      <div className="navbar-actions">
        <button className="icon-btn">
          <Icon name="search-icon" />
        </button>

        <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Icon name="moon-icon" /> : <Icon name="sun-icon" />}
        </button>

        {user ? (
          <div className="profile-wrapper">
            <button
              className="profile-btn"
              onClick={handleProfileClick}
              aria-label="Open profile menu"
              aria-expanded={showProfileMenu}
            >
              <Icon name="user-icon" />
            </button>

            {showProfileMenu && (
              <div className="profile-menu">
                <button onClick={handleProfile}>Profile</button>

                <button onClick={handleCart}>Cart</button>

                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
