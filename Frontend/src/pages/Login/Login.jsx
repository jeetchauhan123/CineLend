import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import "../Auth.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-page login-page">
      <img src="/login_bg.jpg" alt="Cinema background" className="auth-bg" />

      <div className="auth-overlay"></div>

      <div className="auth-container">
        <div className="auth-card login-card">
          {/* Brand */}
          <div className="auth-brand">
            <Link to={'/'} >
              <img src="/Logo2_WB.PNG" alt="CineLend" />
            </Link>
          </div>

          {/* Header */}
          <div className="auth-header">
            <h1>Welcome back</h1>
            <p>Sign in to continue your cinematic journey.</p>
          </div>

          {/* Form */}
          <form className="auth-form">
            {/* Email */}
            <div className="auth-field">
              <label htmlFor="login-email">Email</label>

              <input
                type="email"
                id="login-email"
                placeholder="Enter your email"
                autoComplete="email"
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
                  placeholder="Enter your password"
                  autoComplete="current-password"
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
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            {/* Submit */}
            <button type="submit" className="auth-submit">
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          {/* Google */}
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
