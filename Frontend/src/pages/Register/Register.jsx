import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Register.css";
import "../Auth.css";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error while user is correcting the form
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    // Frontend validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        name,
        email,
        password,
      });

      // Registration successful
      navigate("/login");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page register-page">
      <img src="/login_bg.jpg" alt="Cinema background" className="auth-bg" />

      <div className="auth-overlay"></div>

      <div className="auth-container">
        <div className="auth-card register-card">
          {/* Brand */}
          <div className="auth-brand">
            <Link to="/">
              <img src="/Logo2_WB.PNG" alt="CineLend" />
            </Link>
          </div>

          {/* Header */}
          <div className="auth-header">
            <h1>Create account</h1>
            <p>Start your cinematic journey with CineLend.</p>
          </div>

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="auth-field">
              <label htmlFor="register-name">Name</label>

              <input
                type="text"
                id="register-name"
                name="name"
                placeholder="Your name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="auth-field">
              <label htmlFor="register-email">Email</label>

              <input
                type="email"
                id="register-email"
                name="email"
                placeholder="Your email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="register-fields">
              {/* Password */}
              <div className="auth-field">
                <label htmlFor="register-password">Password</label>

                <div className="auth-password">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="register-password"
                    name="password"
                    placeholder="Create password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? "◉" : "○"}
                  </button>
                </div>
              </div>

              {/* Confirm password */}
              <div className="auth-field">
                <label htmlFor="register-confirm-password">
                  Confirm password
                </label>

                <div className="auth-password">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="register-confirm-password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? "◉" : "○"}
                  </button>
                </div>
              </div>
            </div>

            {/* Error */}
            {error && <p className="auth-error">{error}</p>}

            {/* Submit */}
            <button type="submit" className="auth-submit" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
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

          {/* Login */}
          <p className="auth-switch">
            Already have an account?
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
