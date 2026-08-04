import { useEffect, useRef, useState } from "react";
import axios from "axios";

import "./Discover.css";
import MovieCard from "../../components/homemovie/MovieCard";
import DiscoverSidebar from "./Component/DiscoverSidebar";
import FilterChips from "./Component/FilterChips";
import Icon from "../../components/Icon";

function Discover() {
  const [movies, setMovies] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    genres: [],
    languages: [],
    countries: [],
    rated: [],
  });

  const defaultFilters = {
    genres: [],
    languages: [],
    countries: [],
    rated: [],

    minRating: "",
    maxRating: "",

    yearFrom: "",
    yearTo: "",

    runtimeMin: "",
    runtimeMax: "",

    cast: "",
    director: "",
    writer: "",
  };
  const [draftFilters, setDraftFilters] = useState(defaultFilters);

  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);

  const sortOptions = [
    {
      value: "default",
      label: "Default",
    },
    {
      value: "recent",
      label: "Recently Released",
    },
    {
      value: "rating",
      label: "Highest Rated",
    },
    {
      value: "title",
      label: "Title: A–Z",
    },
    {
      value: "random",
      label: "Surprise Me",
    },
  ];

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const selectedSort =
    sortOptions.find((option) => option.value === sort) || sortOptions[0];

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/movies/filters",
        );

        setFilters(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get("http://localhost:3000/movies", {
          params: {
            search: debouncedSearch,

            genres: appliedFilters.genres.join(","),
            languages: appliedFilters.languages.join(","),
            countries: appliedFilters.countries.join(","),
            rated: appliedFilters.rated.join(","),

            minRating: appliedFilters.minRating,
            maxRating: appliedFilters.maxRating,

            yearFrom: appliedFilters.yearFrom,
            yearTo: appliedFilters.yearTo,

            runtimeMin: appliedFilters.runtimeMin,
            runtimeMax: appliedFilters.runtimeMax,

            cast: appliedFilters.cast,
            director: appliedFilters.director,
            writer: appliedFilters.writer,

            hasPoster: true,

            sort,

            page: 1,

            limit: 24,
          },
        });

        setMovies(response.data.movies);

        setTotalMovies(response.data.pagination.total);
      } catch (error) {
        console.error("Error loading movies:", error);

        setError("Unable to load movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [sort, debouncedSearch, appliedFilters]);

  const handleFilterChange = (category, value) => {
    setDraftFilters((previous) => {
      const exists = previous[category].includes(value);

      return {
        ...previous,

        [category]: exists
          ? previous[category].filter((item) => item !== value)
          : [...previous[category], value],
      };
    });
  };

  const clearFilters = () => {
    setDraftFilters(defaultFilters);
  };

  return (
    <main className="discover-page">
      <section className="discover-header">
        <div className="discover-heading">
          <p className="discover-eyebrow">FIND YOUR NEXT MOVIE</p>

          <h1>Discover Movies</h1>

          <p>
            Search and explore movies by title, genre, rating, year, and more.
          </p>
        </div>

        <div className="discover-search">
          <span className="search-icon"><Icon name="search-icon" /></span>
          

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search movies..."
          />
        </div>
      </section>

      <section className="discover-content">
        <DiscoverSidebar
          filters={filters}
          draftFilters={draftFilters}
          setDraftFilters={setDraftFilters}
          onFilterChange={handleFilterChange}
          onClear={clearFilters}
          onApply={() => setAppliedFilters(draftFilters)}
        />

        <div className="discover-results">
          <div className="results-header">
            <div>
              <h2>Explore Movies</h2>
            </div>

            <div
              className={`sort-control ${
                isSortOpen ? "sort-control-open" : ""
              }`}
              ref={sortRef}
            >
              <button
                type="button"
                className="sort-button"
                onClick={() => setIsSortOpen((previous) => !previous)}
                aria-expanded={isSortOpen}
                aria-haspopup="listbox"
              >
                <span>{selectedSort.label}</span>

                <span className="sort-arrow">▾</span>
              </button>

              {isSortOpen && (
                <div className="sort-menu" role="listbox">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={sort === option.value}
                      className={`sort-option ${
                        sort === option.value ? "sort-option-active" : ""
                      }`}
                      onClick={() => {
                        setSort(option.value);

                        setIsSortOpen(false);
                      }}
                    >
                      <span>{option.label}</span>

                      {sort === option.value && (
                        <span className="sort-check">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="results-info">
            {!loading && (
              <p>
                Showing {movies.length} of {totalMovies.toLocaleString()} movies
              </p>
            )}
          </div>

          <FilterChips
            appliedFilters={appliedFilters}
            setAppliedFilters={setAppliedFilters}
            setDraftFilters={setDraftFilters}
          />

          {loading && <div className="discover-status">Loading movies...</div>}

          {error && <div className="discover-status error">{error}</div>}

          {!loading && !error && movies.length === 0 && (
            <div className="discover-status">No movies found.</div>
          )}

          {!loading && !error && movies.length > 0 && (
            <div className="discover-grid">
              {movies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Discover;
