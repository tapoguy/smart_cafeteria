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
    cb(null, uploadDir); // Store in the uploads directory
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Use a unique filename
  },
});

const upload = multer({ storage });

// Endpoint to fetch Menu of the Day items
router.get('/menu_of_the_day', (_req, res) => {
  const today = new Date().toLocaleDateString('en-CA'); // Format to YYYY-MM-DD considering timezone
  const sql = `
    SELECT 
      m.ItemName, 
      m.ItemDescription, 
      m.Price, 
      m.ImageURL, 
      mod_table.MenuOfTheDayID,  
      mod_table.IsAvailable
    FROM menuoftheday AS mod_table
    JOIN menu AS m ON mod_table.MenuItemID = m.MenuItemID
    WHERE mod_table.Date = ?;
  `;

  db.query(sql, [today], (error, results) => {
    if (error) {
      console.error('Error fetching menu of the day:', error);
      return res.status(500).json({ message: 'Failed to fetch menu of the day' });
    }

    // Add full URL to image paths and log the result
    const menuItems = results.map(item => {
      const imageUrl = item.ImageURL ? `http://localhost:5000${item.ImageURL}` : null;
      console.log(`Image URL for ${item.ItemName}: ${imageUrl}`); // Log image URL
      return {
        ...item,
        ImageURL: imageUrl,
      };
    });

    res.status(200).json(menuItems);
  });
});

// Endpoint to add a new menu item (Menu of the Day)
router.post('/menu_of_the_day', (req, res) => {
  const { menuItemId, isAvailable } = req.body;
  const date = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

  // Validate required fields
  if (!menuItemId || isAvailable === undefined) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // SQL query to add the item to Menu of the Day
  const sql = `INSERT INTO menuoftheday (MenuItemID, Date, IsAvailable) VALUES (?, ?, ?)`;

  const values = [menuItemId, date, isAvailable];

  db.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error inserting item into menu of the day:', error);
      return res.status(500).json({ message: 'Failed to add item to menu of the day' });
    }
    res.status(200).json({ message: 'Item added to menu of the day successfully', id: results.insertId });
  });
});

// Endpoint to serve images for the Menu of the Day
router.get('/menu_of_the_day/images/:imageName', (req, res) => {
  const { imageName } = req.params;
  const imagePath = path.join(uploadDir, imageName); // Full path to the image file

  console.log(`Fetching image: ${imageName}`); // Log the requested image name

  // Serve the image if it exists
  if (fs.existsSync(imagePath)) {
    console.log(`Image found: ${imagePath}`); // Log if image is found
    res.sendFile(imagePath); // Serve the image file from the uploads folder
  } else {
    console.error(`Image not found: ${imagePath}`); // Log if image is not found
    res.status(404).json({ message: 'Image not found' });
  }
});

// Endpoint to update the availability of a Menu of the Day item
router.put('/menu_of_the_day/:id', (req, res) => {
  const { id } = req.params;
  const { isAvailable } = req.body; // Boolean value for availability

  if (isAvailable === undefined) {
    return res.status(400).json({ message: 'isAvailable field is required' });
  }

  // SQL query to update the availability of an item in Menu of the Day
  const sql = `UPDATE menuoftheday SET is_available = ? WHERE MenuOfTheDayID = ?`;

  db.query(sql, [isAvailable, id], (error, results) => {
    if (error) {
      console.error('Error updating item availability:', error);
      return res.status(500).json({ message: 'Failed to update item availability' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item availability updated successfully' });
  });
});

// Static file serving for images (optional)
const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve images directly from uploads folder

module.exports = router;
