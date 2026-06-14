import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import "./HeroSlider.css";

import { movies } from "../../data/movies";

function HeroSlider() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero-slider">
      <Swiper
        className={`movie-swiper ${loaded ? "loaded" : ""}`}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
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
        className="movie-swiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="slide">
              <div
                className="slide-bg"
                style={{
                  backgroundImage: `
                    linear-gradient(
                    rgba(0,0,0,0.45),
                    rgba(0,0,0,0.8)
                    ),
                    url(${movie.image})
                  `,
                }}
              />
              <div className="slide-content">
                <h1>{movie.title}</h1>

                <p>{movie.description}</p>

                <div className="button-group">
                  <button className="play-btn">▶ Play</button>

                  <button className="info-btn">ⓘ More Info</button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="custom-prev">❮</div>

        <div className="custom-next">❯</div>

        <div className="custom-pagination"></div>
      </Swiper>
    </section>
  );
}

export default HeroSlider;
