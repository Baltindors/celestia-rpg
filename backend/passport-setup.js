// passport-setup.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mysql = require("mysql2");

// Create a MySQL connection (same credentials as in server.js)
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});
connection.connect();

// Serialize the user into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser((id, done) => {
  connection.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) return done(err);
    done(null, results[0]);
  });
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      connection.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, results) => {
          if (err) return done(err);
          if (results.length) {
            // User exists
            return done(null, results[0]);
          } else {
            // Create a new user
            const newUser = {
              name: profile.displayName,
              email: email,
              provider: "google",
            };
            connection.query(
              "INSERT INTO users SET ?",
              newUser,
              (err, result) => {
                if (err) return done(err);
                newUser.id = result.insertId;
                return done(null, newUser);
              }
            );
          }
        }
      );
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "displayName", "emails"],
    },
    (accessToken, refreshToken, profile, done) => {
      // Note: Facebook may not always return an email address.
      const email = profile.emails ? profile.emails[0].value : null;
      connection.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, results) => {
          if (err) return done(err);
          if (results.length) {
            return done(null, results[0]);
          } else {
            const newUser = {
              name: profile.displayName,
              email: email,
              provider: "facebook",
            };
            connection.query(
              "INSERT INTO users SET ?",
              newUser,
              (err, result) => {
                if (err) return done(err);
                newUser.id = result.insertId;
                return done(null, newUser);
              }
            );
          }
        }
      );
    }
  )
);
