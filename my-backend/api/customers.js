const express = require('express');
const db = require('./db'); // Adjust the path to your database connection
const router = express.Router();

router.get('/customers', (req, res) => {
  const sql = 'SELECT CustomerID as userId, FirstName as firstName, LastName as lastName, UserName as username FROM customer';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send({ error: 'Failed to retrieve customers' });
    }

    res.json(results);
  });
});

module.exports = router;
