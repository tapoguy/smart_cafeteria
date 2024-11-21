const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./api/db'); // Ensure your database connection is configured correctly

// Import routes
const signinRoutes = require('./api/signin');
const signupRoutes = require('./api/signup');
const menuRoutes = require('./api/menu'); // Menu routes
const favoritesRoutes = require('./api/favorites');
const customersRoutes = require('./api/customers');
const feedbackRoutes = require('./api/feedback');
const menuOfTheDayRoutes = require('./api/menu_of_the_day');
const ordersRoutes = require('./api/orders');  // Include the orders route

const app = express();

// Allowed frontend origins
const allowedOrigins = ['http://127.0.0.1:5501', 'http://172.20.10.2'];

// CORS setup
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Serve uploaded images as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware for parsing JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create HTTP server and attach Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PATCH'],
  },
});

// Attach routes
app.use('/api', signinRoutes);
app.use('/api', signupRoutes);
app.use('/api', menuRoutes); // Updated menu routes
app.use('/api', favoritesRoutes);
app.use('/api', customersRoutes);

// Attach Socket.io instance to feedback and orders routes
app.use('/api', (req, res, next) => {
  req.io = io;  // Make io instance available for the routes
  next();
}, feedbackRoutes, ordersRoutes);  // Orders routes should also have access to socket.io

app.use('/api', menuOfTheDayRoutes);

// Socket.io connection logic
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Example: Custom event
  socket.on('testEvent', (data) => {
    console.log('Received testEvent:', data);
    io.emit('testResponse', { message: 'Test response!' });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Export io for use in other modules (optional)
module.exports = { io };
