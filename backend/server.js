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

// 1. ADD MIDDLEWARE TO PARSE JSON AND FORM DATA
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
const authRoutes = require("./routes/auth"); // 2. Import new auth routes

// Use routes.
app.use("/auth", authRoutes); // 3. Use new auth routes for /register, /login
app.use("/auth/google", googleRoutes);
app.use("/auth/facebook", facebookRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Backend server is running.");
});

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    // Redirect to frontend after logout
    res.redirect("http://localhost:8080/login");
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
