// passport-setup.js
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy; // 1. Import LocalStrategy
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const path = require("path");

module.exports = function (passport) {
  // Use the robust path for dotenv
  require("dotenv").config({ path: path.join(__dirname, ".env") });

  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
  });

  // 2. Add the Local Strategy for email/password login
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const [users] = await pool.query(
            "SELECT * FROM users WHERE email = ? AND provider = 'local'",
            [email]
          );
          if (users.length === 0) {
            return done(null, false, {
              message: "That email is not registered.",
            });
          }

          const user = users[0];
          const isMatch = await bcrypt.compare(password, user.password);

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password incorrect." });
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          provider: "google",
          providerId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        };
        try {
          let [user] = await pool.query(
            "SELECT * FROM users WHERE providerId = ?",
            [profile.id]
          );
          if (user.length > 0) {
            done(null, user[0]);
          } else {
            await pool.query("INSERT INTO users SET ?", newUser);
            let [newUserRecord] = await pool.query(
              "SELECT * FROM users WHERE providerId = ?",
              [profile.id]
            );
            done(null, newUserRecord[0]);
          }
        } catch (err) {
          done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const [users] = await pool.query("SELECT * FROM users WHERE id = ?", [
        id,
      ]);
      done(null, users[0]);
    } catch (err) {
      done(err);
    }
  });
};
