const sqlite3 = require('sqlite3').verbose();
const DB_PATH = './users.db';

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error("Error connecting to the database", err.message);
    }
});

module.exports = db;