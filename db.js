// https://www.mongodb.com/docs/

require("dotenv").config();
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

let db;

async function connectDB() {
    if (db) return db;

    await client.connect();
    db = client.db("focusfinder"); // moet overeenkomen met URI
    console.log("MongoDB connected");
    return db;
}

module.exports = connectDB;