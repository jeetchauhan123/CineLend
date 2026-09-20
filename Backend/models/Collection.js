const mongoose = require("mongoose");

const { cineLendDB } = require("../config/db");

const collectionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

collectionSchema.index({ userId: 1, name: 1 }, { unique: true });

const Collection = cineLendDB.model("Collection", collectionSchema);

module.exports = Collection;
