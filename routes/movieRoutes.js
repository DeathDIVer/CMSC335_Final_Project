"use strict";

const express = require("express");
const Movie = require("../models/Movie");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/list", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.render("list", { movies, error: null });
  } catch (error) {
    res.render("list", {
      movies: [],
      error: "Could not load your watchlist."
    });
  }
});

router.get("/save-to-list", (req, res) => {
  res.render("save_to_list", { error: null });
});

router.post("/save-to-list", async (req, res) => {
  const movieTitle = req.body.movieTitle;
  const apiKey = process.env.OMDB_API_KEY;

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}`
    );
    const movie = await response.json();

    if (movie.Response === "False") {
      res.render("save_to_list", { error: movie.Error });
      return;
    }

    res.render("movie_result", { movie, error: null });
  } catch (error) {
    res.render("save_to_list", {
      error: "Could not connect to OMDb. Please try again."
    });
  }
});

router.post("/movies", async (req, res) => {
  try {
    await Movie.findOneAndUpdate(
      { imdbID: req.body.imdbID },
      {
        imdbID: req.body.imdbID,
        title: req.body.title,
        year: req.body.year,
        genre: req.body.genre,
        director: req.body.director,
        actors: req.body.actors,
        plot: req.body.plot,
        poster: req.body.poster,
        imdbRating: req.body.imdbRating,
        note: req.body.note
      },
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    );

    res.redirect("/list");
  } catch (error) {
    res.render("movie_result", {
      movie: {
        imdbID: req.body.imdbID,
        Title: req.body.title,
        Year: req.body.year,
        Genre: req.body.genre,
        Director: req.body.director,
        Actors: req.body.actors,
        Plot: req.body.plot,
        Poster: req.body.poster,
        imdbRating: req.body.imdbRating
      },
      error: "Could not save this movie. Check your MongoDB connection."
    });
  }
});

module.exports = router;
