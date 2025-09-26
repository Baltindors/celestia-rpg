// server.js
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
// The old mysql2 require statement has been removed.

require("./passport-setup")(passport);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- CORRECTED CORS CONFIGURATION ---
// This setup will work for both local development and your future live site.
const whitelist = ["http://localhost:8080", process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests that are in the whitelist or have no origin (like Postman/API tools)
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
// --- END OF CORS CONFIGURATION ---

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
const gameRoutes = require("./routes/game");

// Use routes.
app.use("/auth", authRoutes);
app.use("/auth/google", googleRoutes);
app.use("/auth/facebook", facebookRoutes);
app.use("/api/user", userRoutes);
app.use("/api/game", gameRoutes);

app.get("/", (req, res) => {
  res.send("Celestia RPG Backend is running!");
});

// Logout route.
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out." });
    }
    res.status(200).json({ message: "Logged out successfully." });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
