const mongoose = require("mongoose");
const Movie = require("../models/Movie");
const {
  getPricingTier,
  RENTAL_PACKAGES,
  calculateRentalPrice,
} = require("../utils/pricing");

// Api to get movie by id
const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid movie ID",
      });
    }

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.status(200).json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error.message);

    res.status(500).json({
      message: "Failed to fetch movie",
    });
  }
};

// Api to get genre
const getGenres = async (req, res) => {
  try {
    const genres = await Movie.aggregate([
      {
        $unwind: "$genres",
      },
      {
        $group: {
          _id: "$genres",
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const uniqueGenres = genres.map((genre) => genre._id);

    res.status(200).json(uniqueGenres);
  } catch (error) {
    console.error("Error fetching genres:", error.message);

    res.status(500).json({
      message: "Failed to fetch genres",
    });
  }
};

// API to get all discover page filters
const getFilters = async (req, res) => {
  try {
    const [filters] = await Movie.aggregate([
      {
        $facet: {
          genres: [
            { $unwind: "$genres" },
            {
              $group: {
                _id: "$genres",
              },
            },
            {
              $sort: {
                _id: 1,
              },
            },
          ],

          languages: [
            { $unwind: "$languages" },
            {
              $group: {
                _id: "$languages",
              },
            },
            {
              $sort: {
                _id: 1,
              },
            },
          ],

          countries: [
            { $unwind: "$countries" },
            {
              $group: {
                _id: "$countries",
              },
            },
            {
              $sort: {
                _id: 1,
              },
            },
          ],

          rated: [
            {
              $match: {
                rated: {
                  $exists: true,
                  $nin: ["", null],
                },
              },
            },
            {
              $group: {
                _id: "$rated",
              },
            },
            {
              $sort: {
                _id: 1,
              },
            },
          ],
        },
      },
    ]);

    res.status(200).json({
      genres: filters.genres.map((item) => item._id),

      languages: filters.languages.map((item) => item._id),

      countries: filters.countries.map((item) => item._id),

      rated: filters.rated.map((item) => item._id),
    });
  } catch (error) {
    console.error("Error fetching filters:", error.message);

    res.status(500).json({
      message: "Failed to fetch filters",
    });
  }
};

// API to search cast, directors and writers
const getPeople = async (req, res) => {
  try {
    const { type, search = "" } = req.query;

    const allowedTypes = ["cast", "directors", "writers"];

    if (!allowedTypes.includes(type)) {
      return res.status(400).json({
        message: "Invalid people type",
      });
    }

    const people = await Movie.aggregate([
      {
        $unwind: `$${type}`,
      },

      {
        $match: {
          [type]: {
            $regex: search,
            $options: "i",
          },
        },
      },

      {
        $group: {
          _id: `$${type}`,
        },
      },

      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    res.status(200).json(people.map((person) => person._id));
  } catch (error) {
    console.error("Error fetching people:", error.message);

    res.status(500).json({
      message: "Failed to fetch people",
    });
  }
};

// movie slider 10 movies(top 10 recent movies)
const getRecentMovies = async (req, res) => {
  try {
    const movies = await Movie.find({
      poster: {
        $exists: true,
        $nin: [null, ""],
      },
    })
      .sort({ released: -1 })
      .limit(10);

    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching recent movies:", error.message);

    res.status(500).json({
      message: "Failed to fetch recent movies",
    });
  }
};

// API to get movies with filters, sorting, and pagination
const getMovies = async (req, res) => {
  try {
    const {
      search,

      genres,
      languages,
      countries,
      rated,

      yearFrom,
      yearTo,

      minRating,
      maxRating,

      runtimeMin,
      runtimeMax,

      cast,
      director,
      writer,

      hasPoster,

      sort = "default",

      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // Only return movies that have a valid poster
    if (hasPoster === "true") {
      query.poster = {
        $exists: true,
        $nin: [null, ""],
      };
    }

    // Search by movie title
    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          fullplot: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Filter by one or multiple genres
    if (genres) {
      const genreList = genres
        .split(",")
        .map((genre) => genre.trim())
        .filter(Boolean);

      if (genreList.length > 0) {
        query.genres = {
          $all: genreList,
        };
      }
    }

    // Filter by languages
    if (languages) {
      const languageList = languages
        .split(",")
        .map((language) => language.trim())
        .filter(Boolean);

      if (languageList.length > 0) {
        query.languages = {
          $all: languageList,
        };
      }
    }

    // Filter by countries
    if (countries) {
      const countryList = countries
        .split(",")
        .map((country) => country.trim())
        .filter(Boolean);

      if (countryList.length > 0) {
        query.countries = {
          $all: countryList,
        };
      }
    }

    // Filter by release year
    if (yearFrom || yearTo) {
      query.released = {};

      if (yearFrom) {
        query.released.$gte = new Date(`${yearFrom}-01-01`);
      }

      if (yearTo) {
        query.released.$lte = new Date(`${yearTo}-12-31`);
      }
    }

    // Filter by IMDb rating
    if (minRating || maxRating) {
      query["imdb.rating"] = {};

      if (minRating) {
        query["imdb.rating"].$gte = Number(minRating);
      }

      if (maxRating) {
        query["imdb.rating"].$lte = Number(maxRating);
      }
    }

    // Filter by runtime
    if (runtimeMin || runtimeMax) {
      query.runtime = {};

      if (runtimeMin) {
        query.runtime.$gte = Number(runtimeMin);
      }

      if (runtimeMax) {
        query.runtime.$lte = Number(runtimeMax);
      }
    }

    // Filter by actor
    if (cast) {
      query.cast = {
        $elemMatch: {
          $regex: cast,
          $options: "i",
        },
      };
    }

    // Filter by director
    if (director) {
      query.directors = {
        $elemMatch: {
          $regex: director,
          $options: "i",
        },
      };
    }

    // Filter by writer
    if (writer) {
      query.writers = {
        $elemMatch: {
          $regex: writer,
          $options: "i",
        },
      };
    }

    // Filter by movie certification
    if (rated) {
      const ratedList = rated
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      if (ratedList.length > 0) {
        query.rated = {
          $all: ratedList,
        };
      }
    }

    // Convert query values to numbers
    const currentPage = Math.max(Number(page) || 1, 1);

    const movieLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);

    const skip = (currentPage - 1) * movieLimit;

    // Sorting options
    const sortOptions = {
      default: {
        _id: -1,
      },

      recent: {
        released: -1,
      },

      oldest: {
        released: 1,
      },

      updated: {
        lastupdated: -1,
      },

      rating: {
        "imdb.rating": -1,
      },

      ratingAsc: {
        "imdb.rating": 1,
      },

      title: {
        title: 1,
      },

      titleDesc: {
        title: -1,
      },

      runtime: {
        runtime: -1,
      },
    };

    // Random movies
    if (sort === "random") {
      const movies = await Movie.aggregate([
        {
          $match: query,
        },
        {
          $sample: {
            size: movieLimit,
          },
        },
      ]);

      return res.status(200).json({
        movies,
        pagination: {
          page: currentPage,
          limit: movieLimit,
          total: movies.length,
          totalPages: 1,
        },
      });
    }

    // Get total number of matching movies
    const total = await Movie.countDocuments(query);

    // Get movies
    const movies = await Movie.find(query)
      .sort(sortOptions[sort] || sortOptions.default)
      .skip(skip)
      .limit(movieLimit);

    res.status(200).json({
      movies,

      pagination: {
        page: currentPage,
        limit: movieLimit,
        total,
        totalPages: Math.ceil(total / movieLimit),
      },
    });
  } catch (error) {
    console.error("Error fetching movies:", error.message);

    res.status(500).json({
      message: "Failed to fetch movies",
    });
  }
};

// API to get movies related to a movie
const getRelatedMovies = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid movie ID",
      });
    }

    // Number of recommendations to return
    const recommendationLimit = 5;

    // Get the current movie
    const movie = await Movie.findById(id).select("genres");

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    const genres = movie.genres || [];

    // If the movie has no genres, there is nothing to match
    if (!genres.length) {
      return res.status(200).json([]);
    }

    // Find movies that have at least one matching genre
    const relatedMovies = await Movie.aggregate([
      {
        $match: {
          _id: {
            $ne: new mongoose.Types.ObjectId(id),
          },

          genres: {
            $in: genres,
          },

          poster: {
            $exists: true,
            $nin: [null, ""],
          },
        },
      },

      // Find how many genres each movie shares
      {
        $addFields: {
          genreMatchCount: {
            $size: {
              $setIntersection: ["$genres", genres],
            },
          },
        },
      },

      // Stronger genre matches come first
      {
        $sort: {
          genreMatchCount: -1,
        },
      },
    ]);

    /*
      Group movies by the number of matching genres.

      Example:

      5 matching genres
      ├── Movie A
      ├── Movie B

      4 matching genres
      ├── Movie C
      ├── Movie D
      └── Movie E

      3 matching genres
      └── Movie F
    */

    const groupedMovies = {};

    relatedMovies.forEach((movie) => {
      const matchCount = movie.genreMatchCount;

      if (!groupedMovies[matchCount]) {
        groupedMovies[matchCount] = [];
      }

      groupedMovies[matchCount].push(movie);
    });

    const recommendations = [];

    // Start with highest possible genre match
    for (let matchCount = genres.length; matchCount >= 1; matchCount--) {
      const movies = groupedMovies[matchCount];

      if (!movies) {
        continue;
      }

      // Randomize movies within the same match level
      const shuffledMovies = [...movies].sort(() => Math.random() - 0.5);

      for (const movie of shuffledMovies) {
        if (recommendations.length >= recommendationLimit) {
          break;
        }

        recommendations.push(movie);
      }

      if (recommendations.length >= recommendationLimit) {
        break;
      }
    }

    res.status(200).json(recommendations);
  } catch (error) {
    console.error("Error fetching related movies:", error.message);

    res.status(500).json({
      message: "Failed to fetch related movies",
    });
  }
};

const getMoviePricing = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid movie ID",
      });
    }

    const movie = await Movie.findById(id).lean();

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    const releaseYear = movie.released
      ? new Date(movie.released).getFullYear()
      : Number(movie.year);

    if (!releaseYear) {
      return res.status(400).json({
        message: "Movie release year is unavailable",
      });
    }

    const tier = getPricingTier(releaseYear);

    if (!tier) {
      return res.status(400).json({
        message: "Movie release year is outside the supported pricing range",
      });
    }

    const packages = RENTAL_PACKAGES.map((rentalPackage) => {
      const rentalPrice = calculateRentalPrice(releaseYear, {
        type: rentalPackage.id,
      });

      return {
        id: rentalPackage.id,
        name: rentalPackage.name,
        days: rentalPackage.days,
        price: rentalPrice.price,
      };
    });

    return res.status(200).json({
      movieId: movie._id,
      releaseYear,
      tier: tier.name,
      baseDailyPrice: tier.baseDailyPrice,
      packages,
    });
  } catch (error) {
    console.error("Get movie pricing error:", error);

    return res.status(500).json({
      message: "Failed to get movie pricing",
    });
  }
};

module.exports = {
  getMovies,
  getMovieById,
  getGenres,
  getFilters,
  getPeople,
  getRecentMovies,
  getRelatedMovies,
  getMoviePricing,
};
