"use strict";

const path = require("path");
const readline = require("readline");
const express = require("express");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");

// TODO: Get an API key for OMDb api
const response = await fetch(
  `https://www.omdbapi.com/?apikey=${apiKey}&t=${movieTitle}`
);

const movieData = await response.json();