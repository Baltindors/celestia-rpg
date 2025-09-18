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
    // THIS IS THE FIX: Redirect to the frontend's dedicated callback route
    res.redirect("http://localhost:8080/auth/callback");
  }
);

module.exports = router;
