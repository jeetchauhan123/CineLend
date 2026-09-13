const mongoose = require("mongoose");
const { cineLendDB } = require("../config/db");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.index(
  { userId: 1, movieId: 1 },
  { unique: true }
);

const Cart = cineLendDB.model("Cart", cartSchema);

module.exports = Cart;