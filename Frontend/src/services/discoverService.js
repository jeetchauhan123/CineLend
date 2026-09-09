import axios from "axios";

const API_URL = "http://localhost:3000/movies";

export const getDiscoverFilters = () => {
  return axios.get(`${API_URL}/filters`);
};

export const fetchDiscoverResults = ({
  search = "",
  filters,
  sort = "default",
  page = 1,
  limit = 24,
}) => {
  return axios.get(API_URL, {
    params: {
      search,

      genres: filters.genres.join(","),
      languages: filters.languages.join(","),
      countries: filters.countries.join(","),
      rated: filters.rated.join(","),

      minRating: filters.minRating,
      maxRating: filters.maxRating,

      yearFrom: filters.yearFrom,
      yearTo: filters.yearTo,

      runtimeMin: filters.runtimeMin,
      runtimeMax: filters.runtimeMax,

      cast: filters.cast,
      director: filters.director,
      writer: filters.writer,

      hasPoster: true,
      sort,
      page,
      limit,
    },
  });
};

export const searchDiscoverPeople = (type, search) => {
  return axios.get(`${API_URL}/people`, {
    params: {
      type,
      search,
    },
  });
};