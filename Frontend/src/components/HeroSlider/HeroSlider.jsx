import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
} from "swiper/modules";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import "./HeroSlider.css";

function HeroSlider() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/movies/recent"
        );

        setMovies(res.data);

        console.log("Movies loaded", res.data);
      } catch (error) {
        console.error("Error loading movies:", error);
      }
    };

    getMovies();
  }, []);

  if (movies.length === 0) {
    return null;
  }

  return (
    <section className="hero-slider">
      <Swiper
        className="movie-swiper"
        modules={[
          Autoplay,
          Pagination,
          Navigation,
          EffectFade,
        ]}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        loop={movies.length > 1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        speed={1200}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie._id}>
            <div className="slide">

              <div
                className="slide-bg"
                style={{
                  backgroundImage: `
                    linear-gradient(
                      rgba(0, 0, 0, 0.45),
                      rgba(0, 0, 0, 0.8)
                    ),
                    url(${movie.poster})
                  `,
                }}
              />

              <div className="slide-content">
                {/* left side */}
                <div className="slider-movie-info">
                  <h1>{movie.title}</h1>

                  <p>{movie.plot}</p>

                  <div className="button-group">
                    <button className="play-btn">
                      <Link to={`/movie/${movie._id}`}>
                        ▶ Rent
                      </Link>
                    </button>

                    <button className="info-btn">
                      <Link to={`/movie/${movie._id}`}>
                        ⓘ More Info
                      </Link>
                    </button>
                  </div>
                </div>

                {/* right side */}
                <div className="slider-movie-poster">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                  />
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation */}
      <div className="custom-prev">❮</div>
      <div className="custom-next">❯</div>

      {/* Pagination */}
      <div className="custom-pagination"></div>
    </section>
  );
}

export default HeroSlider;