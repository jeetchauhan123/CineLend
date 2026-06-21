import React from 'react'
import "./About.css";

const About = () => {
  return (
    <section className="about-page">
      <div className="about-header">
        <h1>CineLend</h1>

        <p>
          Modern Movie Discovery & Rental Platform
        </p>
      </div>

      <div className="about-grid">

        <div className="about-card">
          <h2>Project Overview</h2>

          <p>
            CineLend is a React-based movie platform
            focused on discovering movies through
            immersive browsing experiences,
            categorized collections, and intuitive
            navigation.
          </p>

          <p>
            The project is being developed as a
            modern single-page application using
            React and React Router.
          </p>
        </div>

        <div className="about-card">
          <h2>Technology Stack</h2>

          <ul>
            <li>React 19</li>
            <li>React Router DOM</li>
            <li>Vite</li>
            <li>Vanilla CSS</li>
            <li>Glassmorphism UI Design</li>
            <li>ESLint</li>
          </ul>
        </div>

        <div className="about-card">
          <h2>Implemented Features</h2>

          <ul>
            <li>Dark / Light Theme</li>
            <li>Hero Movie Slider</li>
            <li>Glass Navigation Bar</li>
            <li>Onboarding Modal</li>
            <li>Genre Categorization</li>
            <li>Movie Rows</li>
            <li>Interactive Movie Cards</li>
            <li>Client Side Routing</li>
            <li>Footer Section</li>
          </ul>
        </div>

        <div className="about-card">
          <h2>Current Routes</h2>

          <ul>
            <li>/</li>
            <li>/about</li>
          </ul>
        </div>

        <div className="about-card">
          <h2>Planned Features</h2>

          <ul>
            <li>Movie Details Page</li>
            <li>Search System</li>
            <li>Discover Section</li>
            <li>Wishlist</li>
            <li>User Authentication</li>
            <li>Rental Workflow</li>
            <li>Advanced Filtering</li>
          </ul>
        </div>

      </div>
    </section>
  );
}

export default About
