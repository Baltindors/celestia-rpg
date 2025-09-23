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
    // THIS IS THE FIX: Redirect to the frontend's dedicated callback route
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback`);
  }
);

module.exports = router;
