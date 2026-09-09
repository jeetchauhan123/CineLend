const mongoose = require("mongoose");

const sampleDB = mongoose.createConnection(
  process.env.MONGO_URI
);

const cineLendDB = mongoose.createConnection(
  process.env.CINELEND_MONGO_URI
);

const connectDB = async () => {
  try {
    await Promise.all([
      sampleDB.asPromise(),
      cineLendDB.asPromise(),
    ]);

    console.log("Sample MongoDB connected successfully");
    console.log("CineLend MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  sampleDB,
  cineLendDB,
};
// await mongoose.connect(process.env.MONGO_URI);
