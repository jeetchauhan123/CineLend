import { useEffect, useState } from "react";
import axios from "axios";

import MovieRow from "./MovieRow";

function HomeMovies() {
  const [topStreaming, setTopStreaming] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [trySomethingNew, setTrySomethingNew] = useState([]);

  useEffect(() => {
    const fetchHomeMovies = async () => {
      try {
        const [
          topStreamingResponse,
          trendingResponse,
          topRatedResponse,
          randomResponse,
          trySomethingNewResponse,
        ] = await Promise.all([
          axios.get(
            "http://localhost:3000/movies?sort=updated&limit=10&hasPoster=true"
          ),

          axios.get(
            "http://localhost:3000/movies?sort=recent&limit=10&hasPoster=true"
          ),

          axios.get(
            "http://localhost:3000/movies?sort=rating&limit=10&hasPoster=true"
          ),

          axios.get(
            "http://localhost:3000/movies?sort=random&limit=10&hasPoster=true"
          ),

          axios.get(
            "http://localhost:3000/movies?sort=random&limit=10&hasPoster=true"
          ),
        ]);

        setTopStreaming(
          topStreamingResponse.data.movies
        );

        setTrendingMovies(
          trendingResponse.data.movies
        );

        setTopRated(
          topRatedResponse.data.movies
        );

        setRecommendedMovies(
          randomResponse.data.movies
        );

        setTrySomethingNew(
          trySomethingNewResponse.data.movies
        );
      } catch (error) {
        console.error(
          "Error loading home movies:",
          error
        );
      }
    };

    fetchHomeMovies();
  }, []);

  return (
    <>
      <MovieRow
        title="Top Streaming"
        subtitle="Most rented this week"
        movies={topStreaming}
      />

      <MovieRow
        title="Trending Now"
        subtitle="What everyone's talking about"
        movies={trendingMovies}
      />

      <MovieRow
        title="Top Rated"
        subtitle="Critically acclaimed favorites"
        movies={topRated}
      />

      {/* Genre boxes will be added here later */}

      <MovieRow
        title="Recommended For You"
        subtitle="Curated just for your taste"
        movies={recommendedMovies}
      />

      <MovieRow
        title="Try Something New"
        subtitle="Step outside your comfort zone"
        movies={trySomethingNew}
      />
    </>
  );
}

export default HomeMovies;