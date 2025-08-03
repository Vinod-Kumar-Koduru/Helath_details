
const express = require('express');
const bcrypt = require('bcrypt');
const UserService = require('./server.js');

const app = express();
const port = 5009;
app.use(express.json());


app.get('/', (req, res) => res.status(200).json({ status: "API is running" }));


app.get('/users', async (req, res) => {
    try {
        const users = await UserService.getAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: "An internal server error occurred" });
    }
});


app.get('/user/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await UserService.getById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "An internal server error occurred" });
    }
});


app.post('/users', async (req, res) => {
    const userDetails = req.body;
    const { name, email, password } = userDetails;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await UserService.create({ name, email, password: hashedPassword });
        res.status(201).json({ status: "User created successfully", userId: result.lastID });
    } catch (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
            return res.status(409).json({ error: "Email already exists" });
        }
        res.status(500).json({ error: "An internal server error occurred" });
    }
});


app.put('/user/:id', async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        const result = await UserService.update(req.params.id, { name, email });
        if (result.changes === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ status: "User updated successfully" });
    } catch (err) {
        res.status(500).json({ error: "An internal server error occurred" });
    }
});

app.delete('/user/:id', async (req, res) => {
    try {
        const result = await UserService.delete(req.params.id);
        if (result.changes === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ status: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "An internal server error occurred" });
    }
});


app.get('/search', async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ error: "A 'name' query parameter is required" });
    }
    try {
        const users = await UserService.searchByName(name);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: "An internal server error occurred" });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        const user = await UserService.getByEmail(email);
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            res.status(200).json({ status: "Login successful", userId: user.id });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ error: "An internal server error occurred" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});