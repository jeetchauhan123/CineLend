const mongoose = require("mongoose");
const { cineLendDB } = require("../config/db");

const rentalItemSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    durationType: {
      type: String,
      required: true,
    },

    durationDays: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    rentedAt: {
      type: Date,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "returned", "expired"],
      default: "active",
    },
  },
  { _id: true },
);

const rentalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    items: {
      type: [rentalItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "A rental must contain at least one movie",
      },
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["demo"],
      default: "demo",
    },
  },
  { timestamps: true },
);

const Rental = cineLendDB.model("Rental", rentalSchema);

module.exports = Rental;
