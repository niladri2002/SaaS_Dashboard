const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import User model
const authenticateToken = require('../middleware/authMiddleware'); // Import the middleware

// Protected Route: Get User Profile
router.get('/data', authenticateToken, async (req, res) => {
    console.log('PUT /api/profile hit');
  try {
    const user = await User.findById(req.user.id).select('-password'); // Fetch user without password
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


router.put('/update', authenticateToken, async (req, res) => {
    console.log('PUT /api/profile/update hit');
    const { name, email, password } = req.body;
    
    try {
      // Find the user by ID
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Update user details (name, email, password)
      if (name) user.name = name;
      if (email) user.email = email;
      if (password) {
        // Hash the new password before saving
        user.password = await bcrypt.hash(password, 12);
      }
  
      // Save the updated user profile
      await user.save();
  
      // Return the updated user profile without the password
      res.status(200).json({ message: 'Profile updated successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

module.exports = router;
