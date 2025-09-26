// server.js
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

require("./passport-setup")(passport);

const app = express();
const PORT = process.env.PORT || 3000;

// This lets Express trust the proxy that Render puts in front of your app.
app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const whitelist = ["http://localhost:8080", process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// --- PRODUCTION-READY SESSION CONFIGURATION ---
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
      httpOnly: true, // Prevents client-side JS from accessing the cookie
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Must be 'none' for cross-site cookies
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiry time: 1 day
    },
  })
);
// --- END OF SESSION CONFIGURATION ---

app.use(passport.initialize());
app.use(passport.session());

// Import and use routes
const googleRoutes = require("./routes/google");
const facebookRoutes = require("./routes/facebook");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const gameRoutes = require("./routes/game");

app.use("/auth", authRoutes);
app.use("/auth/google", googleRoutes);
app.use("/auth/facebook", facebookRoutes);
app.use("/api/user", userRoutes);
app.use("/api/game", gameRoutes);

app.get("/", (req, res) => {
  res.send("Celestia RPG Backend is running!");
});

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
