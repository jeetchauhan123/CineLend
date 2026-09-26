import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import useDebounce from "../../hooks/useDebounce";
import {
  getDiscoverFilters,
  fetchDiscoverResults,
} from "../../services/discoverService";

import "./Discover.css";
import MovieCard from "../../components/homemovie/MovieCard";
import DiscoverSidebar from "./Component/DiscoverSidebar";
import Icon from "../../components/Icon";
import Skeleton from "../../components/Skeleton/Skeleton";

import { DEFAULT_FILTERS, SORT_OPTIONS } from "../../constants/discover";

function MovieGridSkeleton() {
  return (
    <div className="discover-grid discover-grid-skeleton">
      {Array.from({ length: 24 }).map((_, index) => (
        <div className="movie-skeleton-card" key={index}>
          <Skeleton width="100%" height="315px" borderRadius="12px" />

          <Skeleton
            width="75%"
            height="18px"
            borderRadius="6px"
            className="movie-skeleton-title"
          />

          <Skeleton width="45%" height="14px" borderRadius="6px" />
        </div>
      ))}
    </div>
  );
}

function getFiltersFromURL(searchParams) {
  return {
    genres: searchParams.get("genres")
      ? searchParams.get("genres").split(",")
      : [],

    languages: searchParams.get("languages")
      ? searchParams.get("languages").split(",")
      : [],

    countries: searchParams.get("countries")
      ? searchParams.get("countries").split(",")
      : [],

    rated: searchParams.get("rated")
      ? searchParams.get("rated").split(",")
      : [],

    minRating: searchParams.get("minRating") || "",
    maxRating: searchParams.get("maxRating") || "",

    yearFrom: searchParams.get("yearFrom") || "",
    yearTo: searchParams.get("yearTo") || "",

    runtimeMin: searchParams.get("runtimeMin") || "",
    runtimeMax: searchParams.get("runtimeMax") || "",

    cast: searchParams.get("cast") || "",
    director: searchParams.get("director") || "",
    writer: searchParams.get("writer") || "",
  };
}

function Discover() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);

  const LIMIT = 24;

  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const [sort, setSort] = useState(searchParams.get("sort") || "default");

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

  const [filterState, setFilterState] = useState(() =>
    getFiltersFromURL(searchParams),
  );

  const [clearSignal, setClearSignal] = useState(0);

  const debouncedSearch = useDebounce(search, 400);
  const debouncedFilters = useDebounce(filterState, 300);

  const selectedSort =
    SORT_OPTIONS.find((option) => option.value === sort) || SORT_OPTIONS[0];

  // Close sort menu when clicking outside it.
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

  // Fetch available filter options once.
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await getDiscoverFilters();

        setFilters(response.data);
      } catch (error) {
        console.error("Error loading discover filters:", error);
      }
    };

    fetchFilters();
  }, []);

  /*
   * Fetch movies whenever the debounced search,
   * debounced filters, sort or page changes.
   */
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        // TEMPORARY: delay response to test skeleton
        // await new Promise((resolve) => setTimeout(resolve, 5000));

        const response = await fetchDiscoverResults({
          search: debouncedSearch,
          filters: debouncedFilters,
          sort,
          page,
          limit: LIMIT,
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
  }, [debouncedSearch, debouncedFilters, sort, page]);

  useEffect(() => {
    const params = {};

    if (debouncedSearch) {
      params.search = debouncedSearch;
    }

    if (debouncedFilters.genres.length) {
      params.genres = debouncedFilters.genres.join(",");
    }

    if (debouncedFilters.languages.length) {
      params.languages = debouncedFilters.languages.join(",");
    }

    if (debouncedFilters.countries.length) {
      params.countries = debouncedFilters.countries.join(",");
    }

    if (debouncedFilters.rated.length) {
      params.rated = debouncedFilters.rated.join(",");
    }

    if (debouncedFilters.minRating !== "") {
      params.minRating = debouncedFilters.minRating;
    }

    if (debouncedFilters.maxRating !== "") {
      params.maxRating = debouncedFilters.maxRating;
    }

    if (debouncedFilters.yearFrom !== "") {
      params.yearFrom = debouncedFilters.yearFrom;
    }

    if (debouncedFilters.yearTo !== "") {
      params.yearTo = debouncedFilters.yearTo;
    }

    if (debouncedFilters.runtimeMin !== "") {
      params.runtimeMin = debouncedFilters.runtimeMin;
    }

    if (debouncedFilters.runtimeMax !== "") {
      params.runtimeMax = debouncedFilters.runtimeMax;
    }

    if (debouncedFilters.cast) {
      params.cast = debouncedFilters.cast;
    }

    if (debouncedFilters.director) {
      params.director = debouncedFilters.director;
    }

    if (debouncedFilters.writer) {
      params.writer = debouncedFilters.writer;
    }

    if (sort !== "default") {
      params.sort = sort;
    }

    if (page > 1) {
      params.page = page;
    }

    setSearchParams(params, { replace: true });
  }, [debouncedSearch, debouncedFilters, sort, page, setSearchParams]);

  const handleFilterChange = (category, value) => {
    setPage(1);

    setFilterState((previous) => {
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
    setFilterState(DEFAULT_FILTERS);
    setSearch("");
    setSort("default");
    setPage(1);
    setSearchParams({}, { replace: true });

    setClearSignal((previous) => previous + 1);
  };

  const totalPages = Math.ceil(totalMovies / LIMIT);

  const getPaginationPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    // Beginning
    if (page <= 3) {
      return [1, 2, 3, 4, 5, "..."];
    }

    // End
    if (page >= totalPages - 2) {
      return [
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // Middle
    return ["...", page - 2, page - 1, page, page + 1, page + 2, "..."];
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
          <span className="search-icon">
            <Icon name="search-icon" />
          </span>

          <input
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Search movies..."
          />
        </div>
      </section>

      <section className="discover-content">
        <DiscoverSidebar
          filters={filters}
          filterState={filterState}
          setFilterState={setFilterState}
          onFilterChange={handleFilterChange}
          onClear={clearFilters}
          clearSignal={clearSignal}
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
                  {SORT_OPTIONS.map((option) => (
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
                        setPage(1);
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
                {totalMovies === 0
                  ? "0"
                  : `${(page - 1) * LIMIT + 1} - ${Math.min(
                      page * LIMIT,
                      totalMovies,
                    )}`}{" "}
                of {totalMovies.toLocaleString()} movies
              </p>
            )}
          </div>

          {loading && <MovieGridSkeleton />}

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

          {!loading && !error && totalPages > 1 && (
            <div className="pagination">
              {/* First */}
              <button
                type="button"
                className="pagination-arrow"
                disabled={page === 1}
                onClick={() => {
                  setPage(1);

                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                First
              </button>

              {/* Previous */}
              <button
                type="button"
                className="pagination-arrow"
                disabled={page === 1}
                onClick={() => {
                  setPage((previous) => previous - 1);

                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                ←
              </button>

              {/* Page numbers */}
              <div className="pagination-pages">
                {getPaginationPages().map((item, index) =>
                  item === "..." ? (
                    <span
                      key={`ellipsis-${index}`}
                      className="pagination-ellipsis"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={item}
                      type="button"
                      className={`pagination-page ${
                        page === item ? "pagination-page-active" : ""
                      }`}
                      disabled={page === item}
                      onClick={() => {
                        setPage(item);

                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                    >
                      {item}
                    </button>
                  ),
                )}
              </div>

              {/* Next */}
              <button
                type="button"
                className="pagination-arrow"
                disabled={page === totalPages}
                onClick={() => {
                  setPage((previous) => previous + 1);

                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                →
              </button>

              {/* Last */}
              <button
                type="button"
                className="pagination-arrow"
                disabled={page === totalPages}
                onClick={() => {
                  setPage(totalPages);

                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                Last
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Discover;
