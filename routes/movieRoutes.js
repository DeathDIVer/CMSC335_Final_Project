"use strict";

const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/list", (req, res) => {
  res.render("list");
});

router.get("/save-to-list", (req, res) => {
  res.render("save_to_list");
});

module.exports = router;
