// server.js
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mysql = require("mysql2");
require("dotenv").config();
require("./passport-setup"); // Import our Passport configuration

const app = express();

// MySQL connection
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});
connection.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// Express session middleware
app.use(
  session({
    secret: "your_secret", // Change this to a strong secret in production
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport and sessions
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // On success, redirect to the frontend callback route passing user data as a query parameter.
    res.redirect(
      "http://localhost:8080/auth/callback?user=" +
        encodeURIComponent(JSON.stringify(req.user))
    );
  }
);

// Facebook OAuth routes
app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect(
      "http://localhost:8080/auth/callback?user=" +
        encodeURIComponent(JSON.stringify(req.user))
    );
  }
);

// API endpoint to get current user data (if needed)
app.get("/api/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
