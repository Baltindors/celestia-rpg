// routes/user.js
const express = require("express");
const router = express.Router();
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const { Pool } = require("pg"); // Use pg

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Not authenticated" });
};

// GET current user data
router.get("/", isAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

// POST to select a race for the current user
router.post("/select-race", isAuthenticated, async (req, res) => {
  const { race } = req.body;
  const userId = req.user.id;

  if (!race) {
    return res.status(400).json({ message: "Race selection is required." });
  }

  try {
    if (req.user.race) {
      return res
        .status(400)
        .json({ message: "You have already selected a race." });
    }

    // CORRECTED: Use $1, $2 for PostgreSQL parameters
    await pool.query("UPDATE users SET race = $1 WHERE id = $2", [
      race,
      userId,
    ]);

    // CORRECTED: Use $1 for PostgreSQL parameter
    await pool.query("INSERT INTO player_stats (user_id) VALUES ($1)", [
      userId,
    ]);

    // CORRECTED: Fetch updated user and destructure the 'rows' property
    const { rows: updatedUserData } = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [userId]
    );

    res.json({
      message: "Race selected successfully!",
      user: updatedUserData[0], // Send the first (and only) user from the rows array
    });
  } catch (error) {
    console.error("Error selecting race:", error);
    res.status(500).json({ message: "Server error during race selection." });
  }
});

module.exports = router;
