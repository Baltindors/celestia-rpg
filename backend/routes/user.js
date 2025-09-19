// routes/user.js
const express = require("express");
const router = express.Router();
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const mysql = require("mysql2/promise");

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Not authenticated" });
};

// GET current user data (no changes here)
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
    // Check if the user already has a race
    if (req.user.race) {
      return res
        .status(400)
        .json({ message: "You have already selected a race." });
    }

    // Update the user's race in the database
    await pool.query("UPDATE users SET race = ? WHERE id = ?", [race, userId]);

    // Create initial stats for the player
    await pool.query("INSERT INTO player_stats (user_id) VALUES (?)", [userId]);

    // Fetch the updated user data to send back
    const [updatedUser] = await pool.query("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);

    // Passport's req.user doesn't automatically update, so we send the fresh data
    res.json({ message: "Race selected successfully!", user: updatedUser[0] });
  } catch (error) {
    console.error("Error selecting race:", error);
    res.status(500).json({ message: "Server error during race selection." });
  }
});

module.exports = router;
