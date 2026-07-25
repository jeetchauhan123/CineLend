import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import Icon from "../Icon";

function Navbar({ darkMode, setDarkMode }) {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isMovieDetails = location.pathname.startsWith("/movie/");

  return (
    <nav className={`navbar ${isHomePage || isMovieDetails ? "navbar-home" : "navbar-page"}`}>
      <div className="navbar-logo">
        <img src="./Logo2_WB.PNG" alt="CineLend Logo" />
      </div>
      
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/movies">Movies</Link>
        </li>
        <li>
          <Link to="/discover">Discover</Link>
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
          {darkMode ? (
            /* Moon */
            <Icon name="moon-icon" />
          ) : (
            /* Sun */
            <Icon name="sun-icon" />
          )}
        </button>

        <button className="login-btn">Login</button>
      </div>
    </nav>
  );
}

export default Navbar;
