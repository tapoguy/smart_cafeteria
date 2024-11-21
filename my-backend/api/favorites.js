const express = require('express');
const router = express.Router();
const db = require('./db'); // MySQL connection

// Add item to Favorites
router.post('/add', (req, res) => {
  const { CustomerID, MenuItemID, IconStatus } = req.body;

  // Check if the item already exists in the user's favorites
  db.query('SELECT * FROM favorites WHERE CustomerID = ? AND MenuItemID = ? AND IsActive = TRUE', [CustomerID, MenuItemID], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }

    if (results.length > 0) {
      // If the item is already in favorites, update the status (toggle between filled and outlined)
      const newStatus = IconStatus ? 0 : 1; // If the item is active (filled), deactivate it (set to outlined)
      const query = 'UPDATE favorites SET IconStatus = ?, IsActive = ? WHERE CustomerID = ? AND MenuItemID = ?';
      db.query(query, [newStatus, newStatus === 1 ? true : false, CustomerID, MenuItemID], (err, updateResults) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to update favorites' });
        }
        res.status(200).json({
          message: 'Favorite toggled successfully',
          favoriteId: results[0].FavoriteID,
          iconStatus: newStatus === 1 ? 'filled' : 'outlined'
        });
      });
    } else {
      // If the item is not in favorites, insert it
      const query = 'INSERT INTO favorites (CustomerID, MenuItemID, IconStatus, IsActive) VALUES (?, ?, ?, ?)';
      db.query(query, [CustomerID, MenuItemID, IconStatus, true], (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to add to favorites' });
        }
        res.status(201).json({
          message: 'Item added to favorites successfully',
          favoriteId: results.insertId
        });
      });
    }
  });
});

// Get all favorite items for a user (with fixed route path)
router.get('/favorites/:customerID', (req, res) => { // Fixed route to avoid conflicts
  const { customerID } = req.params; // Accessing customerID from the params

  // Get all active favorite items for the customer
  const query = 'SELECT * FROM favorites WHERE CustomerID = ? AND IsActive = TRUE';
  db.query(query, [customerID], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch favorites' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No favorites found for this customer' });
    }

    // Return all favorite items for the customer
    res.status(200).json({ favorites: results });
  });
});

// Remove item from Favorites (mark as inactive)
router.post('/remove', (req, res) => {
  const { CustomerID, MenuItemID } = req.body;

  // Mark the item as inactive (remove from favorites)
  const query = 'UPDATE favorites SET IsActive = FALSE WHERE CustomerID = ? AND MenuItemID = ?';
  db.query(query, [CustomerID, MenuItemID], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to remove from favorites' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Item not found in favorites' });
    }

    res.status(200).json({ message: 'Item removed from favorites successfully' });
  });
});

module.exports = router;
