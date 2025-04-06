// routes/google.js
const express = require("express");
const passport = require("passport");

const router = express.Router();

// Initiate Google OAuth
router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route for Google OAuth
router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect to your frontend.
    res.redirect("http://localhost:8080");
  }
);

module.exports = router;
