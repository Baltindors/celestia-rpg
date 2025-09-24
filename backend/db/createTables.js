// db/createTables.js
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const mysql = require("mysql2/promise");

async function manageSchema() {
  let pool;
  try {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    console.log("Starting database schema management...");

    // 1. Ensure the 'users' table exists
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        provider VARCHAR(50) NOT NULL,
        providerId VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_provider_id (provider, providerId)
      )
    `;
    await pool.query(createUsersTable);
    console.log("- Table 'users' is ready.");

    // 2. Check for and add the 'race' column to the 'users' table
    const checkRaceColumn = `
      SELECT * FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users' AND COLUMN_NAME = 'race'
    `;
    const [columns] = await pool.query(checkRaceColumn, [
      process.env.MYSQL_DATABASE,
    ]);

    if (columns.length === 0) {
      const addRaceColumn = `
        ALTER TABLE users
        ADD COLUMN race VARCHAR(50) NULL DEFAULT NULL AFTER email;
      `;
      await pool.query(addRaceColumn);
      console.log("- Column 'race' added to 'users' table.");
    } else {
      console.log("- Column 'race' in 'users' table already exists.");
    }

    // 3. Ensure the 'races' table exists
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
    console.log("- Table 'races' is ready.");

    // 4. Ensure the 'player_stats' table exists
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
    console.log("- Table 'player_stats' is ready.");

    console.log("Database schema is up to date.");
  } catch (error) {
    console.error("Error managing database schema:", error);
  } finally {
    if (pool) {
      await pool.end(); // Ensure the connection is always closed
      console.log("Connection closed.");
    }
  }
}

manageSchema();
