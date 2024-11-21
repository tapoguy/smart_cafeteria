const express = require('express');
const db = require('./db'); // Ensure the correct path to your db module

const router = express.Router();

// POST route to submit feedback
router.post('/feedback', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Insert feedback into the database without Customer_ID
  const query = 'INSERT INTO feedback (message, readFeedback, created_at) VALUES (?, ?, NOW())';
  db.query(query, [message, false], (err, result) => {
    if (err) {
      console.error('Error inserting feedback:', err);
      return res.status(500).json({ error: 'Failed to submit feedback' });
    }

    console.log('Feedback saved to database:', result);

    // Emit real-time feedback to the admin
    req.io.emit('newFeedback', {
      FeedbackID: result.insertId,
      message,
      readFeedback: false,
      created_at: new Date(), // Include a timestamp for context
    });

    return res.status(201).json({ message: 'Feedback submitted successfully', success: true });
  });
});

// PATCH route to mark feedback as read (admin only)
router.patch('/feedback/:id/read', (req, res) => {
  const feedbackId = req.params.id;

  if (!feedbackId) {
    return res.status(400).json({ error: 'Feedback ID is required' });
  }

  // Update the read status of the feedback
  const query = 'UPDATE feedback SET readFeedback = ? WHERE FeedbackID = ?';
  db.query(query, [true, feedbackId], (err, result) => {
    if (err) {
      console.error('Error updating feedback read status:', err);
      return res.status(500).json({ error: 'Failed to mark feedback as read' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    console.log('Feedback marked as read:', feedbackId);

    // Emit real-time event to notify the admin and customers
    req.io.emit('feedbackRead', { FeedbackID: feedbackId });

    return res.status(200).json({ message: 'Feedback marked as read', success: true });
  });
});

module.exports = router;
