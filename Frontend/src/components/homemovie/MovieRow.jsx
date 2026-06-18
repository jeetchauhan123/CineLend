import { useEffect, useRef, useState } from "react";
import "./MovieRow.css";
import MovieCard from "./MovieCard";

function MovieRow({ title, movies, subtitle }) {
  const rowRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  const startX = useRef(0);
  const scrollLeftRef = useRef(0);

  const smoothScroll = (distance) => {
    const container = rowRef.current;

    if (!container) return;

    const start = container.scrollLeft;
    const target = start + distance;

    const duration = 1000;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;

      const progress = Math.min(elapsed / duration, 1);

      const ease =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      container.scrollLeft = start + (target - start) * ease;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const scrollLeft = () => {
    smoothScroll(-600);
  };

  const scrollRight = () => {
    smoothScroll(600);
  };

  const handleMouseDown = (e) => {
    const container = rowRef.current;

    setIsDragging(true);

    startX.current = e.pageX;

    scrollLeftRef.current = container.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const container = rowRef.current;

    const walk = (e.pageX - startX.current) * 1.5;

    container.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const updateFades = () => {
    const container = rowRef.current;

    if (!container) return;

    const maxScroll =
      container.scrollWidth - container.clientWidth;

    setShowLeftFade(container.scrollLeft > 5);

    setShowRightFade(
      container.scrollLeft < maxScroll - 5
    );
  };

  useEffect(() => {
    updateFades();
  }, []);

  return (
    <section className="movie-row">
      <div className="movie-row-header">
        <div>
          <span className="section-tag">Collection</span>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <button className="view-all-btn">
          View All →
        </button>
      </div>

      <div className={`movie-row-wrapper
          ${showLeftFade ? "show-left-fade" : ""}
          ${showRightFade ? "show-right-fade" : ""}
        `}
      >
        <button className="nav-btn left" onClick={scrollLeft}>
          ❮
        </button>

        <div
          ref={rowRef}
          className={`movie-row-container ${isDragging ? "dragging" : ""}`}
          onScroll={updateFades}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <button className="nav-btn right" onClick={scrollRight}>
          ❯
        </button>
      </div>
    </section>
  );
}

export default MovieRow;
