require('dotenv').config(); // Load .env variables
const express = require('express');
const connectDB = require('./config/db'); // Import the database connection
const app = express();
const cors = require('cors'); // Import CORS middleware

app.use(cors()); // Enable CORS for all routes


// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());


// Routes
app.use('/api/auth', require('./routes/auth')); // Authentication routes
app.use('/api/profile', require('./routes/profile'));
app.use('/api/analytics', require('./routes/analytics')); // Profile routes (protected)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
