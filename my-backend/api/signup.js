// signup.js (backend)

const express = require('express');
const db = require('./db'); // Assuming db connection is configured in a separate file (like db.js)

const router = express.Router();

// Signup endpoint to add a new user
router.post('/signup', (req, res) => {
  const { username, password, firstName, lastName } = req.body;

  if (!username || !password || !firstName || !lastName) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'INSERT INTO customer (UserName, Password, FirstName, LastName) VALUES (?, ?, ?, ?)';
  db.query(sql, [username, password, firstName, lastName], (err, results) => {
    if (err) {
      console.error('Database insertion error:', err);
      return res.status(500).send(err);
    }

    return res.json({
      message: 'Registration successful',
      userId: results.insertId,
      username: username,
      firstName: firstName,
      lastName: lastName,
    });
  });
});

module.exports = router;
