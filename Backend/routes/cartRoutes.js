const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

const router = express.Router();

router.use(authMiddleware);

router.post("/", addToCart);

router.get("/", getCart);

router.delete("/:movieId", removeFromCart);

router.delete("/", clearCart);

module.exports = router;