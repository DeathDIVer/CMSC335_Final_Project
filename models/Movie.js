"use strict";

const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  imdbID: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  year: String,
  genre: String,
  director: String,
  actors: String,
  plot: String,
  poster: String,
  imdbRating: String,
  note: String
}, {
  timestamps: true
});

module.exports = mongoose.model("Movie", movieSchema);
