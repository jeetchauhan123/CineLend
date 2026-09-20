import axios from "axios";
import { useEffect, useState } from "react";

import MovieCard from "../../../../components/homemovie/MovieCard";
import Skeleton from "../../../../components/Skeleton/Skeleton";

import "./MovieRelated.css";

const RelatedMovies = ({ movieId }) => {
  const [relatedMovies, setRelatedMovies] =
    useState([]);

  const [relatedLoading, setRelatedLoading] =
    useState(true);

  useEffect(() => {
    const getRelatedMovies = async () => {
      setRelatedLoading(true);

      try {
        const res = await axios.get(
          `http://localhost:3000/movies/related/${movieId}`
        );

        setRelatedMovies(res.data);
      } catch (error) {
        console.log(
          "Error loading related movies:",
          error
        );

        setRelatedMovies([]);
      } finally {
        setRelatedLoading(false);
      }
    };

    getRelatedMovies();
  }, [movieId]);

  return (
    <section className="movie-section movie-related">
      <div className="movie-section__heading">
        <span className="movie-section__eyebrow">
          KEEP EXPLORING
        </span>

        <h2>You May Also Like</h2>
      </div>

      <div className="movie-related__slider">
        {relatedLoading ? (
          Array.from({ length: 5 }).map(
            (_, index) => (
              <Skeleton
                key={index}
                width="240px"
                height="360px"
                borderRadius="18px"
              />
            )
          )
        ) : relatedMovies.length ? (
          relatedMovies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
            />
          ))
        ) : (
          <p className="movie-related__empty">
            No similar movies found.
          </p>
        )}
      </div>
    </section>
  );
};

export default RelatedMovies;