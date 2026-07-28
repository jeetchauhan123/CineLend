const mongoose = require("mongoose");
const Movie = require("../models/Movie");


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
      yearFrom,
      yearTo,
      minRating,
      maxRating,
      rated,
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
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by one or multiple genres
    if (genres) {
      const genreList = genres
        .split(",")
        .map((genre) => genre.trim())
        .filter(Boolean);

      if (genreList.length > 0) {
        query.genres = {
          $in: genreList,
        };
      }
    }

    // Filter by release year
    if (yearFrom || yearTo) {
      query.released = {};

      if (yearFrom) {
        query.released.$gte = new Date(
          `${yearFrom}-01-01`
        );
      }

      if (yearTo) {
        query.released.$lte = new Date(
          `${yearTo}-12-31`
        );
      }
    }

    // Filter by IMDb rating
    if (minRating || maxRating) {
      query["imdb.rating"] = {};

      if (minRating) {
        query["imdb.rating"].$gte =
          Number(minRating);
      }

      if (maxRating) {
        query["imdb.rating"].$lte =
          Number(maxRating);
      }
    }

    // Filter by movie certification
    if (rated) {
      query.rated = rated;
    }

    // Convert query values to numbers
    const currentPage = Math.max(
      Number(page) || 1,
      1
    );

    const movieLimit = Math.min(
      Math.max(Number(limit) || 10, 1),
      100
    );

    const skip =
      (currentPage - 1) * movieLimit;

    // Sorting options
    const sortOptions = {
      recent: {
        released: -1,
      },

      updated: {
        lastupdated: -1,
      },

      rating: {
        "imdb.rating": -1,
      },

      title: {
        title: 1,
      },

      default: {
        _id: -1,
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
    const total = await Movie.countDocuments(
      query
    );

    // Get movies
    const movies = await Movie.find(query)
      .sort(
        sortOptions[sort] ||
          sortOptions.default
      )
      .skip(skip)
      .limit(movieLimit);

    res.status(200).json({
      movies,

      pagination: {
        page: currentPage,
        limit: movieLimit,
        total,
        totalPages: Math.ceil(
          total / movieLimit
        ),
      },
    });
  } catch (error) {
    console.error(
      "Error fetching movies:",
      error.message
    );

    res.status(500).json({
      message: "Failed to fetch movies",
    });
  }
};

module.exports = {getMovies,getMovieById,getGenres,getRecentMovies,};