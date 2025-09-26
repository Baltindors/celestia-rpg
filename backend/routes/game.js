// routes/game.js
const express = require("express");
const router = express.Router();
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const { Pool } = require("pg"); // Use pg

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Route to get all available races
router.get("/races", async (req, res) => {
  try {
    // CORRECTED: Destructure the 'rows' property from the result object
    const { rows: races } = await pool.query("SELECT * FROM races");
    res.json(races);
  } catch (error) {
    console.error("Error fetching races:", error);
    res.status(500).json({ message: "Server error fetching race data." });
  }
});

module.exports = router;
