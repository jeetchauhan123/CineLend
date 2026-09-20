const mongoose = require("mongoose");

const Collection = require("../models/Collection");
const CollectionMovie = require("../models/CollectionMovie");
const Movie = require("../models/Movie");

// =========================================================
// CREATE COLLECTION
// =========================================================

const createCollection = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.userId;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Collection name is required",
      });
    }

    const existingCollection = await Collection.findOne({
      userId,
      name: name.trim(),
    });

    if (existingCollection) {
      return res.status(409).json({
        message: "A collection with this name already exists",
      });
    }

    const collection = await Collection.create({
      userId,
      name: name.trim(),
      description: description?.trim() || "",
    });

    res.status(201).json({
      message: "Collection created",
      collection,
    });
  } catch (error) {
    console.error("Create collection error:", error);

    res.status(500).json({
      message: "Failed to create collection",
    });
  }
};

// =========================================================
// GET USER COLLECTIONS
// =========================================================

const getUserCollections = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { movieId } = req.query;

    const collections = await Collection.find({
      userId,
    }).sort({
      createdAt: -1,
    });

    let movieCollectionIds = new Set();

    if (movieId && mongoose.Types.ObjectId.isValid(movieId)) {
      const collectionMovies = await CollectionMovie.find({
        movieId,
      }).select("collectionId");

      movieCollectionIds = new Set(
        collectionMovies.map((item) =>
          item.collectionId.toString()
        )
      );
    }

    const collectionsWithStatus = collections.map(
      (collection) => ({
        ...collection.toObject(),
        containsMovie: movieCollectionIds.has(
          collection._id.toString()
        ),
      })
    );

    res.json({
      collections: collectionsWithStatus,
    });
  } catch (error) {
    console.error("Get collections error:", error);

    res.status(500).json({
      message: "Failed to get collections",
    });
  }
};

// =========================================================
// GET SINGLE COLLECTION
// =========================================================

const getCollection = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(collectionId)) {
      return res.status(400).json({
        message: "Invalid collection ID",
      });
    }

    const collection = await Collection.findOne({
      _id: collectionId,
      userId,
    });

    if (!collection) {
      return res.status(404).json({
        message: "Collection not found",
      });
    }

    const collectionMovies = await CollectionMovie.find({
      collectionId,
    }).sort({
      createdAt: -1,
    });

    const movieIds = collectionMovies.map(
      (item) => item.movieId
    );

    const movies = movieIds.length
      ? await Movie.find({
          _id: { $in: movieIds },
        })
      : [];

    res.json({
      collection,
      movies,
    });
  } catch (error) {
    console.error("Get collection error:", error);

    res.status(500).json({
      message: "Failed to get collection",
    });
  }
};

// =========================================================
// UPDATE COLLECTION
// =========================================================

const updateCollection = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const { name, description } = req.body;
    const userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(collectionId)) {
      return res.status(400).json({
        message: "Invalid collection ID",
      });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Collection name is required",
      });
    }

    const collection = await Collection.findOne({
      _id: collectionId,
      userId,
    });

    if (!collection) {
      return res.status(404).json({
        message: "Collection not found",
      });
    }

    const duplicate = await Collection.findOne({
      _id: { $ne: collectionId },
      userId,
      name: name.trim(),
    });

    if (duplicate) {
      return res.status(409).json({
        message: "A collection with this name already exists",
      });
    }

    collection.name = name.trim();
    collection.description = description?.trim() || "";

    await collection.save();

    res.json({
      message: "Collection updated",
      collection,
    });
  } catch (error) {
    console.error("Update collection error:", error);

    res.status(500).json({
      message: "Failed to update collection",
    });
  }
};

// =========================================================
// DELETE COLLECTION
// =========================================================

const deleteCollection = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(collectionId)) {
      return res.status(400).json({
        message: "Invalid collection ID",
      });
    }

    const collection = await Collection.findOneAndDelete({
      _id: collectionId,
      userId,
    });

    if (!collection) {
      return res.status(404).json({
        message: "Collection not found",
      });
    }

    await CollectionMovie.deleteMany({
      collectionId,
    });

    res.json({
      message: "Collection deleted",
    });
  } catch (error) {
    console.error("Delete collection error:", error);

    res.status(500).json({
      message: "Failed to delete collection",
    });
  }
};

// =========================================================
// ADD MOVIE TO COLLECTION
// =========================================================

const addMovieToCollection = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const { movieId } = req.body;
    const userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(collectionId)) {
      return res.status(400).json({
        message: "Invalid collection ID",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({
        message: "Invalid movie ID",
      });
    }

    const collection = await Collection.findOne({
      _id: collectionId,
      userId,
    });

    if (!collection) {
      return res.status(404).json({
        message: "Collection not found",
      });
    }

    const movie = await Movie.findById(movieId).select("_id");

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    const existingMovie = await CollectionMovie.findOne({
      collectionId,
      movieId,
    });

    if (existingMovie) {
      return res.status(409).json({
        message: "Movie already exists in this collection",
      });
    }

    const collectionMovie = await CollectionMovie.create({
      collectionId,
      movieId,
    });

    res.status(201).json({
      message: "Movie added to collection",
      collectionMovie,
    });
  } catch (error) {
    console.error("Add movie to collection error:", error);

    res.status(500).json({
      message: "Failed to add movie to collection",
    });
  }
};

// =========================================================
// REMOVE MOVIE FROM COLLECTION
// =========================================================

const removeMovieFromCollection = async (req, res) => {
  try {
    const { collectionId, movieId } = req.params;
    const userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(collectionId)) {
      return res.status(400).json({
        message: "Invalid collection ID",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({
        message: "Invalid movie ID",
      });
    }

    const collection = await Collection.findOne({
      _id: collectionId,
      userId,
    });

    if (!collection) {
      return res.status(404).json({
        message: "Collection not found",
      });
    }

    const deletedMovie = await CollectionMovie.findOneAndDelete({
      collectionId,
      movieId,
    });

    if (!deletedMovie) {
      return res.status(404).json({
        message: "Movie is not in this collection",
      });
    }

    res.json({
      message: "Movie removed from collection",
    });
  } catch (error) {
    console.error(
      "Remove movie from collection error:",
      error
    );

    res.status(500).json({
      message: "Failed to remove movie from collection",
    });
  }
};

module.exports = {
  createCollection,
  getUserCollections,
  getCollection,
  updateCollection,
  deleteCollection,
  addMovieToCollection,
  removeMovieFromCollection,
};
