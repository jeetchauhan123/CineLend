const mongoose = require("mongoose");
const { sampleDB } = require("../config/db");

const sampleCommentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    movie_id: mongoose.Schema.Types.ObjectId,
    text: String,
    date: Date,
  },
  {
    collection: "comments",
  }
);

const SampleComment = sampleDB.model(
  "SampleComment",
  sampleCommentSchema
);

module.exports = SampleComment;