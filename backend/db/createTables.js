// db/createTables.js
require("dotenv").config({ path: "../.env" });
console.log("MYSQL_USER:", process.env.MYSQL_USER); // Debug line

const mysql = require("mysql2/promise");

async function createTables() {
  try {
    const pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        provider VARCHAR(50) NOT NULL,
        providerId VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        email VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await pool.query(createUsersTable);
    console.log("Tables created successfully.");
    await pool.end();
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

createTables();
