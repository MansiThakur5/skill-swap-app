const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.static('public'));
app.get('/api/users', (req, res) => {
  const availability = req.query.availability?.toLowerCase();
  fs.readFile('users.json', 'utf8', (err, data) => {
    let users = JSON.parse(data);
    if (availability) {
      users = users.filter(u => u.availability.toLowerCase().includes(availability));
    }
    res.json(users);
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
