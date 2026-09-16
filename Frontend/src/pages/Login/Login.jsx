import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../../context/AuthContext";

import "./Login.css";
import "../Auth.css";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = formData;

    // Frontend validation
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });

      const { user, token } = response.data;

      // Update authentication state
      login(user, token, rememberMe);

      // Go to home page
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
  console.error("Login response:", error.response);
  console.error("Login request:", error.request);

  const message =
    error.response?.data?.message ||
    "Something went wrong. Please try again.";

  setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page login-page">
      <img src="/login_bg.jpg" alt="Cinema background" className="auth-bg" />

      <div className="auth-overlay"></div>

      <div className="auth-container">
        <div className="auth-card login-card">
          {/* Brand */}
          <div className="auth-brand">
            <Link to="/">
              <img src="/Logo2_WB.PNG" alt="CineLend" />
            </Link>
          </div>

          {/* Header */}
          <div className="auth-header">
            <h1>Welcome back</h1>
            <p>Sign in to continue your cinematic journey.</p>
          </div>

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="auth-field">
              <label htmlFor="login-email">Email</label>

              <input
                type="email"
                id="login-email"
                name="email"
                placeholder="Enter your email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="auth-field">
              <div className="auth-label-row">
                <label htmlFor="login-password">Password</label>

                <button type="button" className="auth-link">
                  Forgot password?
                </button>
              </div>

              <div className="auth-password">
                <input
                  type={showPassword ? "text" : "password"}
                  id="login-password"
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "◉" : "○"}
                </button>
              </div>
            </div>

            {/* Remember */}
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />

              <span>Remember me</span>
            </label>

            {/* Error */}
            {error && <p className="auth-error">{error}</p>}

            {/* Submit */}
            <button type="submit" className="auth-submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          {/* Social */}
          <div className="auth-socials">
            <button type="button" aria-label="Continue with Google">
              <svg aria-hidden="true">
                <use href="/icons.svg#google-icon" />
              </svg>
            </button>

            <button type="button" aria-label="Continue with Facebook">
              <svg aria-hidden="true">
                <use href="/icons.svg#facebook-icon" />
              </svg>
            </button>

            <button type="button" aria-label="Continue with GitHub">
              <svg aria-hidden="true">
                <use href="/icons.svg#github-icon" />
              </svg>
            </button>

            <button type="button" aria-label="Continue with Microsoft">
              <svg aria-hidden="true">
                <use href="/icons.svg#microsoft-icon" />
              </svg>
            </button>
          </div>

          {/* Register */}
          <p className="auth-switch">
            Don't have an account?
            <Link to="/register">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
