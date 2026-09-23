const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Rental = require("../models/Rental");
const Cart = require("../models/Cart");
const Like = require("../models/Like");
const Comment = require("../models/Comment");
const Collection = require("../models/Collection");
const CollectionMovie = require("../models/CollectionMovie");

// User Register
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User with this email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Create user error:", error);

    res.status(500).json({
      message: "Failed to create user",
    });
  }
};

// User Login
const loginUser = async (req, res) => {
  try {
    console.log("Login request received");
    const { email, password } = req.body;
    console.log("Login email:", email);
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    console.log("Creating JWT...");
    console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);

    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    // Login successful
    res.status(200).json({
      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Failed to login",
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);

    res.status(500).json({
      message: "Failed to fetch user",
    });
  }
};

// UPDATE PROFILE INFORMATION
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, email, profileImage } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
      _id: { $ne: userId },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name.trim();
    user.email = normalizedEmail;
    user.profileImage = profileImage?.trim() || "";

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      message: "Failed to update profile",
    });
  }
};

// CHANGE PASSWORD
const changePassword = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "All password fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "New passwords do not match",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      return res.status(401).json({
        message: "Current password is incorrect",
      });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);

    if (isSamePassword) {
      return res.status(400).json({
        message: "New password must be different from your current password",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);

    return res.status(500).json({
      message: "Failed to change password",
    });
  }
};

// TO DELETE THE USER
const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { password, confirmRentalDeletion = false } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Password is required to delete your account",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    /*
     * Check for an ongoing rental.
     *
     * Only active rental items matter here.
     */
    const activeRental = await Rental.findOne({
      userId,
      "items.status": "active",
    });

    /*
     * User has an active rental but has NOT yet
     * explicitly confirmed the second warning.
     *
     * Do not delete anything.
     */
    if (activeRental && !confirmRentalDeletion) {
      return res.status(409).json({
        message:
          "You have an ongoing rental. Additional confirmation is required.",
        hasActiveRental: true,
      });
    }

    /*
     * User has passed all confirmations.
     * Delete all CineLend-owned data.
     *
     * We deliberately do NOT touch Sample DB movies
     * or SampleComment documents.
     */
    await Promise.all([
      Rental.deleteMany({ userId }),
      Cart.deleteMany({ userId }),
      Like.deleteMany({ userId }),
      Comment.deleteMany({ userId }),
      CollectionMovie.deleteMany({ userId }),
      Collection.deleteMany({ userId }),
      User.findByIdAndDelete(userId),
    ]);

    return res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Delete account error:", error);

    return res.status(500).json({
      message: "Failed to delete account",
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  changePassword,
  deleteAccount,
};
