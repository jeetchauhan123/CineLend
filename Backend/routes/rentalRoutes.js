const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createRental,
  getMyRentals,
  returnRentalMovie,
} = require("../controllers/rentalController");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createRental);
router.get("/", getMyRentals);

router.patch(
  "/:rentalId/items/:itemId/return",
  returnRentalMovie,
);

module.exports = router;