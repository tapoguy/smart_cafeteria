const express = require('express');
const db = require('./db'); // Assuming db connection is configured in a separate file (like db.js)

const router = express.Router();

// Test endpoint to check database connection and retrieve data
router.get('/test-db', (req, res) => {
  const sql = 'SELECT * FROM customer';
  console.log('Executing query:', sql);

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database query error:', err); // Log errors for debugging
      return res.status(500).json({ message: 'Database error', error: err });
    }

    // Log the retrieved results
    console.log('Database results:', results);

    // Send the results back as a response
    return res.json({
      message: 'Database connection successful',
      data: results,
    });
  });
});

// Signin endpoint to authenticate the user
router.post('/signin', (req, res) => {
  const { username, password } = req.body;

  // Check if both username and password are provided
  if (!username || !password) {
    console.error('Missing username or password'); // Log error
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // SQL query to check if username and password match in the database
  const sql = 'SELECT * FROM customer WHERE UserName = ? AND Password = ?';
  console.log('Executing query:', sql, [username, password]); // Log SQL and params

  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Database query error:', err); // Log database error
      return res.status(500).json({ message: 'Database error', error: err });
    }

    // Log the query results for debugging
    console.log('Query results:', results);

    // If no matching user is found
    if (results.length === 0) {
      console.warn('Invalid login attempt'); // Log warning
      return res.status(404).json({ message: 'Invalid username or password' });
    }

    // If user found, send a success response with user details
    const user = results[0]; // Assuming the username is unique, take the first result
    console.log('Login successful for user:', user.UserName); // Log success

    return res.json({
      message: 'Login successful',
      userId: user.CustomerID,
      firstName: user.FirstName,
      lastName: user.LastName,
      username: user.UserName,
      role: 'customer', // Add more fields if needed
    });
  });
});

// Export the router so it can be used in index.js
module.exports = router;
