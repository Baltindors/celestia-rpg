// routes/auth.js
const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const { Pool } = require("pg"); // Use pg

const router = express.Router();

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// User Registration Route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // CORRECTED: Use $1 for PostgreSQL parameter
    const { rows: users } = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (users.length > 0) {
      return res.status(409).json({ message: "Email already in use." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // CORRECTED: Use standard INSERT INTO ... VALUES syntax for PostgreSQL
    const insertQuery = `
      INSERT INTO users (provider, providerId, name, email, password)
      VALUES ($1, $2, $3, $4, $5)
    `;

    await pool.query(insertQuery, [
      "local",
      email, // Using email as a unique ID for local auth
      name,
      email,
      hashedPassword,
    ]);

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration." });
  }
});

// User Login Route - uses the 'local' strategy from passport-setup.js
// (This part doesn't need changes as passport handles the SQL)
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ user });
    });
  })(req, res, next);
});

module.exports = router;
