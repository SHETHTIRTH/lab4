const fs = require('fs');
const express = require('express');
const users = require('./MOCK_DATA.json');

const app = express();
const port = 1414;

// Middleware to parse JSON data
app.use(express.json());

// ✅ GET all users
app.get('/data', (req, res) => {
    res.status(200).json({ users });
});

// ✅ POST - Add a new user
app.post('/users', (req, res) => {
    const { first_name, last_name, email, job_title } = req.body;

    if (!first_name || !last_name || !email || !job_title) {
        return res.status(400).json({ msg: "All fields are required." });
    }

    const newUser = { id: users.length + 1, first_name, last_name, email, job_title };
    users.push(newUser);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to save user" });
        }
        res.status(201).json({ status: "Success", id: newUser.id });
    });
});

// ✅ DELETE - Remove a user by ID
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    users.splice(userIndex, 1);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete user' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    });
});

// Start server
app.listen(port, () => {
    console.log(`✅ Server Started at PORT: ${port}`);
});
