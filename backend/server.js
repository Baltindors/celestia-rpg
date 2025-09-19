// server.js
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const mysql = require("mysql2/promise");

require("./passport-setup")(passport);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Import route modules.
const googleRoutes = require("./routes/google");
const facebookRoutes = require("./routes/facebook");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const gameRoutes = require("./routes/game"); // <-- 1. Import new game routes

// Use routes.
app.use("/auth", authRoutes);
app.use("/auth/google", googleRoutes);
app.use("/auth/facebook", facebookRoutes);
app.use("/api/user", userRoutes);
app.use("/api/game", gameRoutes); // <-- 2. Use new game routes

app.get("/", (req, res) => {
  res.send("Backend server is running.");
});

// Logout route.
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      // If there's an error during logout, send a server error status
      return res.status(500).json({ message: "Error logging out." });
    }
    // ON SUCCESS: Send a success status and a JSON message
    res.status(200).json({ message: "Logged out successfully." });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
