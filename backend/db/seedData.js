// db/seedData.js
require("dotenv").config();
const mysql = require("mysql2/promise");

async function seedData() {
  try {
    const pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    // Example: Insert an admin user (adjust as needed)
    const seedUser = `
      INSERT INTO users (provider, providerId, name, email)
      VALUES ('local', 'admin', 'Admin User', 'admin@example.com')
      ON DUPLICATE KEY UPDATE name = 'Admin User'
    `;

    await pool.query(seedUser);
    console.log("Seed data inserted successfully.");
    await pool.end();
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

seedData();
