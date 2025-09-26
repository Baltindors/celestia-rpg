// db/createTables.js
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const { Pool } = require("pg"); // Use pg

async function manageSchema() {
  let pool;
  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const client = await pool.connect(); // Connect to the DB
    console.log("Starting database schema management for PostgreSQL...");

    // 1. Ensure the 'users' table exists (PostgreSQL syntax)
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        provider VARCHAR(50) NOT NULL,
        providerId VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        race VARCHAR(50),
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (provider, providerId)
      )
    `;
    await client.query(createUsersTable);
    console.log("- Table 'users' is ready.");

    // 2. Ensure the 'races' table exists (PostgreSQL syntax)
    const createRacesTable = `
      CREATE TABLE IF NOT EXISTS races (
        id SERIAL PRIMARY KEY,
        race_name VARCHAR(255) NOT NULL UNIQUE,
        kingdom VARCHAR(255),
        description TEXT,
        bonus JSONB,
        starting_units JSONB,
        divine_patron VARCHAR(255)
      )
    `;
    await client.query(createRacesTable);
    console.log("- Table 'races' is ready.");

    // 3. Ensure the 'player_stats' table exists (PostgreSQL syntax)
    const createPlayerStatsTable = `
      CREATE TABLE IF NOT EXISTS player_stats (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        health INT DEFAULT 100,
        mana INT DEFAULT 50,
        stamina INT DEFAULT 80,
        gold INT DEFAULT 100,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `;
    await client.query(createPlayerStatsTable);
    console.log("- Table 'player_stats' is ready.");

    console.log("Database schema is up to date.");
    client.release(); // Release the client back to the pool
  } catch (error) {
    console.error("Error managing database schema:", error);
  } finally {
    if (pool) {
      await pool.end();
      console.log("Connection closed.");
    }
  }
}

manageSchema();
