import { useEffect, useState } from "react";
import axios from "axios";
import MovieRow from "./MovieRow";

const API_URL = import.meta.env.VITE_API_URL;

const shuffleMovies = (movies) => {
  return [...movies].sort(() => Math.random() - 0.5);
};

const getPreferences = () => {
  try {
    const storedPreferences = localStorage.getItem("pref");

    if (!storedPreferences) {
      return {
        age: "",
        genres: [],
      };
    }

    const preferences = JSON.parse(storedPreferences);

    return {
      age: preferences.age || "",
      genres: Array.isArray(preferences.genres) ? preferences.genres : [],
    };
  } catch {
    return {
      age: "",
      genres: [],
    };
  }
};

function HomeMovies() {
  const [topStreaming, setTopStreaming] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [trySomethingNew, setTrySomethingNew] = useState([]);

  useEffect(() => {
    const fetchHomeMovies = async () => {
      try {
        const preferences = getPreferences();
        const selectedGenres = preferences.genres;

        const recommendationParams = new URLSearchParams({
          sort: "random",
          limit: "20",
          hasPoster: "true",
        });

        if (selectedGenres.length > 0) {
          recommendationParams.set("genres", selectedGenres.join(","));

          recommendationParams.set("genreMatch", "any");
        }

        const [
          topStreamingResponse,
          trendingResponse,
          topRatedResponse,
          recommendedResponse,
          trySomethingNewResponse,
        ] = await Promise.all([
          axios.get(`${API_URL}/movies?sort=updated&limit=10&hasPoster=true`),

          axios.get(`${API_URL}/movies?sort=recent&limit=10&hasPoster=true`),

          axios.get(`${API_URL}/movies?sort=rating&limit=10&hasPoster=true`),

          axios.get(`${API_URL}/movies?${recommendationParams.toString()}`),

          axios.get(`${API_URL}/movies?sort=random&limit=20&hasPoster=true`),
        ]);

        const recommended = shuffleMovies(
          recommendedResponse.data.movies || [],
        ).slice(0, 10);

        const recommendedIds = new Set(recommended.map((movie) => movie._id));

        const differentMovies = shuffleMovies(
          (trySomethingNewResponse.data.movies || []).filter(
            (movie) => !recommendedIds.has(movie._id),
          ),
        ).slice(0, 10);

        setTopStreaming(topStreamingResponse.data.movies);
        setTrendingMovies(trendingResponse.data.movies);
        setTopRated(topRatedResponse.data.movies);
        setRecommendedMovies(recommended);
        setTrySomethingNew(differentMovies);
      } catch (error) {
        console.error("Error loading home movies:", error);
      }
    };

    fetchHomeMovies();
  }, []);

  const preferences = getPreferences();
  const hasPreferences = preferences.genres.length > 0;

  return (
    <>
      <MovieRow
        title="Top Streaming"
        subtitle="Most rented this week"
        movies={topStreaming}
        viewAllTo="/discover?sort=updated"
      />

      <MovieRow
        title="Trending Now"
        subtitle="What everyone's talking about"
        movies={trendingMovies}
        viewAllTo="/discover?sort=recent"
      />

      <MovieRow
        title="Top Rated"
        subtitle="Critically acclaimed favorites"
        movies={topRated}
        viewAllTo="/discover?sort=rating"
      />

      <MovieRow
        title="Recommended For You"
        subtitle={
          hasPreferences
            ? "Picked from your favorite genres"
            : "Random picks to discover"
        }
        movies={recommendedMovies}
        viewAllTo={
          hasPreferences
            ? `/discover?genres=${encodeURIComponent(
                preferences.genres.join(","),
              )}&genreMatch=any&sort=random`
            : "/discover?sort=random"
        }
      />

      <MovieRow
        title="Try Something New"
        subtitle="Step outside your comfort zone"
        movies={trySomethingNew}
        viewAllTo="/discover?sort=random"
      />
    </>
  );
}

export default HomeMovies;
