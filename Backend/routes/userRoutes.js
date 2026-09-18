const express = require("express");

const {
  createUser,
  loginUser,
  getCurrentUser,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createUser);

router.post("/login", loginUser);

router.get("/me", authMiddleware, getCurrentUser);

router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You have access to this protected route",
    user: req.user,
  });
});

module.exports = router;
