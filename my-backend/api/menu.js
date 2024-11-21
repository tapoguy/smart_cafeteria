const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const db = require('./db');

// Directory to store uploaded images
const uploadDir = './uploads';

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup for handling image uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Use a unique filename
  },
});

const upload = multer({ storage });

// Endpoint to add a new menu item
router.post('/menu', upload.single('menu_image'), (req, res) => {
  const { name, description, price, specialMeal } = req.body;
  const imageURL = req.file ? `/uploads/${req.file.filename}` : null;

  if (!name || !description || !price) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const sql = `INSERT INTO menu (ItemName, ItemDescription, Price, SpecialMeal, ImageURL)
               VALUES (?, ?, ?, ?, ?)`;
  const values = [name, description, price, specialMeal || false, imageURL];

  db.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error inserting menu item:', error);
      return res.status(500).json({ message: 'Failed to add menu item' });
    }
    res.status(200).json({ message: 'Menu item added successfully', id: results.insertId });
  });
});

// Endpoint to fetch all menu items
router.get('/menu', (_req, res) => {
  const sql = 'SELECT * FROM menu';

  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching menu items:', error);
      return res.status(500).json({ message: 'Failed to fetch menu items' });
    }

    // Add full URL to image paths
    const menuItems = results.map(item => ({
      ...item,
      ImageURL: item.ImageURL ? `http://localhost:5000${item.ImageURL}` : null,
    }));

    res.status(200).json(menuItems);
  });
});

module.exports = router;
