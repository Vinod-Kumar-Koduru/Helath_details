const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const DB_PATH = './users.db';
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error("Error connecting to the database", err.message);
    }
});

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS users"); // drop the table if it exists to not repeat the data

    // create the table
    db.run(`CREATE TABLE users (    
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
    )`);

    //sample data to test the application
    const users = [
        { name: 'John Doe', email: 'john@example.com', password: 'password123' },
        { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
        { name: 'Bob Johnson', email: 'bob@example.com', password: 'qwerty789' }
    ];

    // insert data into the table
    const stement = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    users.forEach(user => {
        const hash = bcrypt.hashSync(user.password, 10);
        stement.run(user.name, user.email, hash);
    });
    stement.finalize();
    console.log("Database initialized with securely hashed sample data.");
});

db.close();