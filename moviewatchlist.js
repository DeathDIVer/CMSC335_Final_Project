"use strict";

require("dotenv").config({ quiet: true });

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const movieRoutes = require("./routes/movieRoutes");

const app = express();
const port = 3000;
const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));

app.use("/", movieRoutes);

async function startServer() {
  if (mongoConnectionString && mongoConnectionString !== "string here!") {
    await mongoose.connect(mongoConnectionString);
    console.log("Connected to MongoDB");
  } else {
    console.log("MongoDB connection string is missing or still a placeholder.");
  }

  const server = app.listen(port, () => {
    console.log(`Movie watchlist app running at http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error("Could not start the app:", error.message);
});
