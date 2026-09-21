const mongoose = require("mongoose");
const { cineLendDB } = require("../config/db");

const cartItemSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },

    items: [cartItemSchema],
  },
  {
    timestamps: true,
  },
);

const Cart = cineLendDB.model("Cart", cartSchema);

module.exports = Cart;
