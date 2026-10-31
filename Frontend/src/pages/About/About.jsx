import "./About.css";

const About = () => {
  return (
    <section className="about-page">
      <div className="about-header">
        <img src="/Logo1_WB.png" alt="Logo" />
      </div>

      <div className="about-grid">

        <div className="about-card">
          <h2>Project Overview</h2>

          <p>
            CineLend is a modern movie discovery and rental platform
            focused on exploring films through immersive browsing experiences,
            custom-curated collections, dynamic tiered pricing, and intuitive
            navigation.
          </p>

          <p>
            The project is developed as a full-stack single-page application
            using React 19, Vite, Express, and a dual-database MongoDB architecture.
          </p>
        </div>

        <div className="about-card">
          <h2>Technology Stack</h2>

          <ul>
            <li>React 19 & Vite 8</li>
            <li>React Router v7</li>
            <li>Node.js & Express 5</li>
            <li>Dual MongoDB (sampleDB + cineLendDB)</li>
            <li>JWT Stateless Authentication</li>
            <li>Vanilla CSS Glassmorphic Design</li>
            <li>Swiper Carousel Integration</li>
          </ul>
        </div>

        <div className="about-card">
          <h2>Implemented Features</h2>

          <ul>
            <li>Dark / Light Theme Toggle</li>
            <li>Hero Movie Slider & Curated Rows</li>
            <li>Personalized Preference Onboarding</li>
            <li>Faceted Movie Discovery & Filters</li>
            <li>Movie Details, Cast & Tomato Ratings</li>
            <li>Tiered Rental Pricing Engine</li>
            <li>Shopping Cart & Demo Checkout</li>
            <li>Active Rental Tracking & Early Returns</li>
            <li>Custom Collections & Bookmarks</li>
            <li>Community Comments & Upvotes</li>
            <li>User Profile & Account Management</li>
          </ul>
        </div>

        <div className="about-card">
          <h2>Platform Routes</h2>

          <ul>
            <li>/ (Home & Hero Slider)</li>
            <li>/discover (Faceted Search & Filters)</li>
            <li>/movie/:id (Movie Details & Pricing)</li>
            <li>/cart (Cart & Duration Selection)</li>
            <li>/checkout & /payment (Demo Checkout)</li>
            <li>/profile (Library, Rentals & Settings)</li>
            <li>/login & /register (Authentication)</li>
            <li>/about (Platform Architecture)</li>
          </ul>
        </div>

        <div className="about-card">
          <h2>Future Roadmap</h2>

          <ul>
            <li>Production Payment Gateway Integration</li>
            <li>Video Streaming & Player Preview</li>
            <li>Social Sharing & Follower Activity</li>
            <li>Mobile Native App (React Native)</li>
          </ul>
        </div>

      </div>
    </section>
  );
};

export default About;
