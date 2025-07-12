const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json()); // for parsing JSON POST requests

// GET users (with optional availability filter)
app.get('/api/users', (req, res) => {
  const availability = req.query.availability?.toLowerCase();
  const data = JSON.parse(fs.readFileSync('users.json', 'utf8'));
  const filtered = availability
    ? data.filter(u => u.availability.toLowerCase().includes(availability))
    : data;
  res.json(filtered);
});

// POST new user
app.post('/api/users', (req, res) => {
  const user = req.body;
  const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
  users.push(user);
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
  res.status(201).json({ message: 'User added' });
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
