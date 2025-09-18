// db/createDatabase.js
require("dotenv").config();
const mysql = require("mysql2/promise");

async function createDatabase() {
  try {
    // Connect without specifying the database
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    });

    const dbName = process.env.MYSQL_DATABASE;
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    console.log(`Database "${dbName}" is ready or already exists.`);
    await connection.end();
  } catch (err) {
    console.error("Error creating database:", err);
  }
}

createDatabase();
