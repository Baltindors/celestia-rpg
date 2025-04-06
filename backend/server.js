// server.js
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const mysql = require("mysql2/promise");

// Initialize Express app and configurations.
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for your Vue app.
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

// MySQL connection pool.
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Session middleware.
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport.
app.use(passport.initialize());
app.use(passport.session());

// Passport session management.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    if (rows.length > 0) {
      done(null, rows[0]);
    } else {
      done(new Error("User not found"));
    }
  } catch (err) {
    done(err);
  }
});

// Import route modules.
const googleRoutes = require("./routes/google");
const facebookRoutes = require("./routes/facebook");
const userRoutes = require("./routes/user");

// Use routes.
app.use("/auth/google", googleRoutes);
app.use("/auth/facebook", facebookRoutes);
app.use("/api/user", userRoutes);

// Root route.
app.get("/", (req, res) => {
  res.send("Backend server is running.");
});

// Logout route.
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
