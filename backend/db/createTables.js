// db/createTables.js
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const mysql = require("mysql2/promise");

async function createTables() {
  try {
    const pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    // 1. UPDATE the users table
    const alterUsersTable = `
      ALTER TABLE users
      ADD COLUMN race VARCHAR(50) NULL DEFAULT NULL AFTER email;
    `;

    // We wrap this in a separate try/catch because it will error if the column already exists, which is fine.
    try {
      await pool.query(alterUsersTable);
      console.log("Users table altered successfully.");
    } catch (error) {
      if (error.code === 'ER_DUP_FIELDNAME') {
        console.log("Column 'race' already exists in 'users' table.");
      } else {
        throw error;
      }
    }

    // 2. CREATE the new races table
    const createRacesTable = `
      CREATE TABLE IF NOT EXISTS races (
        id INT AUTO_INCREMENT PRIMARY KEY,
        race_name VARCHAR(255) NOT NULL UNIQUE,
        kingdom VARCHAR(255),
        description TEXT,
        bonus JSON,
        starting_units JSON,
        divine_patron VARCHAR(255)
      )
    `;
    await pool.query(createRacesTable);
    console.log("Table 'races' created successfully.");

    // 3. CREATE a player_stats table for later
     const createPlayerStatsTable = `
      CREATE TABLE IF NOT EXISTS player_stats (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        health INT DEFAULT 100,
        mana INT DEFAULT 50,
        stamina INT DEFAULT 80,
        gold INT DEFAULT 100,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `;
    await pool.query(createPlayerStatsTable);
    console.log("Table 'player_stats' created successfully.");


    console.log("All tables are ready.");
    await pool.end();
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

createTables();