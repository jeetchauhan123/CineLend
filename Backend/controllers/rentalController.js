const mongoose = require("mongoose");
const Rental = require("../models/Rental");
const Movie = require("../models/Movie");
const Cart = require("../models/Cart");
const { calculateRentalPrice } = require("../utils/pricing");

const createRental = async (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "At least one rental item is required",
      });
    }

    const uniqueMovieIds = [
      ...new Set(items.map((item) => String(item.movieId))),
    ];

    if (
      uniqueMovieIds.some(
        (movieId) => !mongoose.Types.ObjectId.isValid(movieId),
      )
    ) {
      return res.status(400).json({
        message: "One or more movie IDs are invalid",
      });
    }

    // Prevent renting movies that are already actively rented.
    const now = new Date();

    const existingRentals = await Rental.find({
      userId: req.user.userId,
      items: {
        $elemMatch: {
          movieId: {
            $in: uniqueMovieIds.map(
              (movieId) => new mongoose.Types.ObjectId(movieId),
            ),
          },
          status: "active",
          expiresAt: { $gt: now },
        },
      },
    }).lean();

    const activeMovieIds = new Set();

    existingRentals.forEach((rental) => {
      rental.items.forEach((item) => {
        if (
          item.status === "active" &&
          new Date(item.expiresAt) > now &&
          uniqueMovieIds.includes(String(item.movieId))
        ) {
          activeMovieIds.add(String(item.movieId));
        }
      });
    });

    if (activeMovieIds.size > 0) {
      return res.status(409).json({
        message: "One or more movies are already actively rented",
        movieIds: [...activeMovieIds],
      });
    }

    const movies = await Movie.find({
      _id: { $in: uniqueMovieIds },
    }).lean();

    if (movies.length !== uniqueMovieIds.length) {
      return res.status(404).json({
        message: "One or more movies could not be found",
      });
    }

    const rentalItems = [];

    for (const item of items) {
      const movie = movies.find(
        (currentMovie) => String(currentMovie._id) === String(item.movieId),
      );

      if (!movie) {
        return res.status(404).json({
          message: `Movie not found: ${item.movieId}`,
        });
      }

      const releaseYear = movie.released
        ? new Date(movie.released).getFullYear()
        : null;

      if (!releaseYear) {
        return res.status(400).json({
          message: `Release year unavailable for "${movie.title}"`,
        });
      }

      const duration = {
        type: item.duration?.type || item.duration?.id || "custom",
        days: Number(item.duration?.days),
      };

      const rentalPrice = calculateRentalPrice(releaseYear, duration);

      const rentedAt = new Date();

      const expiresAt = new Date(rentedAt);
      expiresAt.setDate(expiresAt.getDate() + rentalPrice.days);

      rentalItems.push({
        movieId: movie._id,
        title: movie.title,
        durationType: duration.type,
        durationDays: rentalPrice.days,
        price: rentalPrice.price,
        rentedAt,
        expiresAt,
        status: "active",
      });
    }

    const totalPrice = rentalItems.reduce(
      (total, item) => total + item.price,
      0,
    );

    const rental = await Rental.create({
      userId: req.user.userId,
      items: rentalItems,
      totalPrice,
      paymentStatus: "paid",
      paymentMethod: "demo",
    });

    await Cart.updateOne(
      { userId: req.user.userId },
      {
        $pull: {
          items: {
            movieId: {
              $in: uniqueMovieIds.map(
                (movieId) => new mongoose.Types.ObjectId(movieId),
              ),
            },
          },
        },
      },
    );

    return res.status(201).json({
      message: "Rental created successfully",
      rental,
    });
  } catch (error) {
    console.error("Create rental error:", error);

    return res.status(500).json({
      message: "Failed to create rental",
    });
  }
};

const getMyRentals = async (req, res) => {
  try {
    const rentals = await Rental.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    const now = new Date();

    for (const rental of rentals) {
      let rentalChanged = false;

      for (const item of rental.items) {
        if (item.status === "active" && new Date(item.expiresAt) <= now) {
          item.status = "expired";
          rentalChanged = true;
        }
      }

      if (rentalChanged) {
        await rental.save();
      }
    }

    return res.status(200).json(rentals);
  } catch (error) {
    console.error("Get rentals error:", error);

    return res.status(500).json({
      message: "Failed to load rentals",
    });
  }
};

const returnRentalMovie = async (req, res) => {
  try {
    const { rentalId, itemId } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(rentalId) ||
      !mongoose.Types.ObjectId.isValid(itemId)
    ) {
      return res.status(400).json({
        message: "Invalid rental information",
      });
    }

    const rental = await Rental.findOne({
      _id: rentalId,
      userId: req.user.userId,
    });

    if (!rental) {
      return res.status(404).json({
        message: "Rental not found",
      });
    }

    const item = rental.items.id(itemId);

    if (!item) {
      return res.status(404).json({
        message: "Rental movie not found",
      });
    }

    if (item.status !== "active") {
      return res.status(400).json({
        message: "This movie is no longer actively rented",
      });
    }

    item.status = "returned";

    await rental.save();

    return res.status(200).json({
      message: "Movie returned successfully",
      rental,
    });
  } catch (error) {
    console.error("Return rental movie error:", error);

    return res.status(500).json({
      message: "Failed to return movie",
    });
  }
};

module.exports = {
  createRental,
  getMyRentals,
  returnRentalMovie,
};
