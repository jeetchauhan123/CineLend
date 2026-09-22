const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const { connectDB } = require("./config/db");
const movieRoutes = require("./routes/movieRoutes");
const commentRoutes = require("./routes/commentRoutes");
const userRoutes = require("./routes/userRoutes");
const likeRoutes = require("./routes/likeRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const cartRoutes = require("./routes/cartRoutes");
const rentalRoutes = require("./routes/rentalRoutes");


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Routes
app.use("/movies", movieRoutes);
app.use("/comments", commentRoutes);
app.use("/users", userRoutes);
app.use("/likes", likeRoutes);
app.use("/collections", collectionRoutes);
app.use("/cart", cartRoutes);
app.use("/rentals", rentalRoutes);


// Health check
app.get("/", (req, res) => {
  res.json({
    message: "CineLend backend is running",
  });
});

// Start server
const startServer = async () => {
  // Connect to MongoDB
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
