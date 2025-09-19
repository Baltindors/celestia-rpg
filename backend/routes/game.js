// routes/game.js
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

// Route to get all available races
router.get("/races", async (req, res) => {
  try {
    const [races] = await pool.query("SELECT * FROM races");
    res.json(races);
  } catch (error) {
    console.error("Error fetching races:", error);
    res.status(500).json({ message: "Server error fetching race data." });
  }
});

module.exports = router;
