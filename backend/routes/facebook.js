// routes/facebook.js
const express = require("express");
const passport = require("passport");

const router = express.Router();

// Initiate Facebook OAuth
router.get("/", passport.authenticate("facebook", { scope: ["email"] }));

// Callback route for Facebook OAuth
router.get(
  "/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:8080");
  }
);

module.exports = router;
