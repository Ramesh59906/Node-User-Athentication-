// config/db.js
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db(process.env.DB_NAME); // Use the DB specified in the .env file
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit process if DB connection fails
  }
}

module.exports = connectDB;
