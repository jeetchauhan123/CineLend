import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MovieHero from "./components/hero/MovieHero";
import MovieOverview from "./components/overview/MovieOverview";
import MovieAbout from "./components/about/MovieAbout";
import MovieCastCrew from "./components/cast/MovieCastCrew";
import MovieAwardsFacts from "./components/awards/MovieAwardsFacts";
import MovieComments from "./components/comments/MovieComments";
import RelatedMovies from "./components/related/RelatedMovies";

import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();

  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    const getDetail = async () => {
      setLoading(true);

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/movies/${id}`);

        setMovieData(res.data);
      } catch (error) {
        console.log("Error loading movie:", error);
        setMovieData(null);
      } finally {
        setLoading(false);
      }
    };

    getDetail();
  }, [id]);

  return (
    <div className="movie-page">
      <MovieHero
        movie={movieData}
        loading={loading}
        movieId={id}
        commentsCount={commentsCount}
      />

      <MovieOverview movie={movieData} loading={loading} />

      <MovieAbout movie={movieData} loading={loading} />

      <MovieCastCrew movie={movieData} loading={loading} />

      <MovieAwardsFacts movie={movieData} loading={loading} />

      <MovieComments movieId={id} onCommentsCountChange={setCommentsCount} />

      <RelatedMovies movieId={id} />
    </div>
  );
};

export default MovieDetails;
