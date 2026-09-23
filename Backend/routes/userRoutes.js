const express = require("express");

const {
  createUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  changePassword,
  deleteAccount,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createUser);

router.post("/login", loginUser);

router.get("/me", authMiddleware, getCurrentUser);

router.put("/me", authMiddleware, updateProfile);

router.put("/me/password", authMiddleware, changePassword);

router.delete("/me", authMiddleware, deleteAccount);

router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You have access to this protected route",
    user: req.user,
  });
});

module.exports = router;
