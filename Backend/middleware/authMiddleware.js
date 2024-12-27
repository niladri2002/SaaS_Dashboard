const jwt = require('jsonwebtoken');

// Middleware to authenticate the token
const authenticateToken = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.header('Authorization')?.split(' ')[1]; // Expecting "Bearer <token>"
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, 'mySuperSecretKey'); // Use your secret key
    req.user = decoded; // Attach the decoded user info to the request object
    next(); // Proceed to the next middleware or route
  } catch (err) {
    // Handle token verification errors
    console.error('Token verification error:', err.message);
    return res.status(400).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authenticateToken;
