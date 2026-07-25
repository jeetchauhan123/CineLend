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
    const movies = await Movie.find()
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

module.exports = {getMovieById,getGenres,getRecentMovies,};