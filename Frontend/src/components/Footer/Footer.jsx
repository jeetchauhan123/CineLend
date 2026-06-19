import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-cta">
        <h2>Still looking for something?</h2>

        <p>
          Explore thousands of movies across every genre and discover your next favorite story.
        </p>

        <button>Browse Movies</button>
      </div>

      <div className="footer-divider" />

      <div className="footer-content">

        <div className="footer-brand">
          <h2>CineLend</h2>

          <p>
            Discover, rent and enjoy great movies from every genre.
          </p>
        </div>

        <div className="footer-column">
          <h3>Browse</h3>

          <a href="#">Movies</a>
          <a href="#">Genres</a>
          <a href="#">Trending</a>
          <a href="#">Top Rated</a>
          <a href="#">New Releases</a>
        </div>

        <div className="footer-column">
          <h3>Support</h3>

          <a href="#">Help Center</a>
          <a href="#">FAQs</a>
          <a href="#">Contact Us</a>
          <a href="#">Report Issue</a>
        </div>

        <div className="footer-column">
          <h3>Legal</h3>

          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Cookies</a>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 CineLend. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;