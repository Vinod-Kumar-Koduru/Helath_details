// user.service.js
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const DB_PATH = './users.db';

// to connect the database
const openDb = async () => {
    return open({
        filename: DB_PATH,
        driver: sqlite3.Database
    });
}
// all fucntion to perform the operation on the database
const UserService = {
    getAll: async () => {
        const db = await openDb();
        const users = await db.all("SELECT id, name, email FROM users");
        await db.close();
        return users;
    },
    getById: async (id) => {
        const db = await openDb();
        const user = await db.get("SELECT id, name, email FROM users WHERE id = ?", [id]);
        await db.close();
        return user;
    },
    getByEmail: async (email) => {
        const db = await openDb();
        const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
        await db.close();
        return user;
    },
    create: async (user) => {
        const db = await openDb();
        const result = await db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [user.name, user.email, user.password]);
        await db.close();
        return result;
    },
    update: async (id, user) => {
        const db = await openDb();
        const result = await db.run("UPDATE users SET name = ?, email = ? WHERE id = ?", [user.name, user.email, id]);
        await db.close();
        return result;
    },
    delete: async (id) => {
        const db = await openDb();
        const result = await db.run("DELETE FROM users WHERE id = ?", [id]);
        await db.close();
        return result;
    },
    searchByName: async (name) => {
        const db = await openDb();
        const users = await db.all("SELECT id, name, email FROM users WHERE name LIKE ?", [`%${name}%`]);
        await db.close();
        return users;
    },
};

module.exports = UserService;