// backend/passport-setup.js
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");

module.exports = function (passport) {
  // PostgreSQL connection pool
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const { rows: users } = await pool.query(
            "SELECT * FROM users WHERE email = $1",
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

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const { rows: users } = await pool.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
      );
      done(null, users[0]);
    } catch (err) {
      done(err);
    }
  });
};
