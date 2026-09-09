export const DEFAULT_FILTERS = {
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

export const SORT_OPTIONS = [
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

export const CHECKBOX_VISIBLE_COUNT = 5;

export const RATING_CONFIG = {
  min: 0,
  max: 10,
  step: 0.1,
  minDistance: 0.1,
};

export const PERSON_TYPES = {
  cast: "cast",
  director: "directors",
  writer: "writers",
};