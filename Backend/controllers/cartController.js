const mongoose = require("mongoose");
const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.user.userId;

    if (!movieId) {
      return res.status(400).json({
        message: "Movie ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({
        message: "Invalid movie ID",
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ movieId }],
      });

      return res.status(201).json({
        message: "Movie added to cart",
        cart,
      });
    }

    const alreadyInCart = cart.items.some(
      (item) => item.movieId.toString() === movieId,
    );

    if (alreadyInCart) {
      return res.status(409).json({
        message: "Movie is already in cart",
      });
    }

    cart.items.push({ movieId });

    await cart.save();

    res.status(200).json({
      message: "Movie added to cart",
      cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);

    res.status(500).json({
      message: "Failed to add movie to cart",
    });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(200).json({
        items: [],
      });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Get cart error:", error);

    res.status(500).json({
      message: "Failed to get cart",
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { movieId } = req.params;
    const userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({
        message: "Invalid movie ID",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const originalLength = cart.items.length;

    cart.items = cart.items.filter(
      (item) => item.movieId.toString() !== movieId,
    );

    if (cart.items.length === originalLength) {
      return res.status(404).json({
        message: "Movie is not in cart",
      });
    }

    await cart.save();

    res.status(200).json({
      message: "Movie removed from cart",
      cart,
    });
  } catch (error) {
    console.error("Remove from cart error:", error);

    res.status(500).json({
      message: "Failed to remove movie from cart",
    });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(200).json({
        message: "Cart is already empty",
        items: [],
      });
    }

    cart.items = [];

    await cart.save();

    res.status(200).json({
      message: "Cart cleared",
      cart,
    });
  } catch (error) {
    console.error("Clear cart error:", error);

    res.status(500).json({
      message: "Failed to clear cart",
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
};