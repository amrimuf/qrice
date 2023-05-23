const jwt = require('jsonwebtoken');
const config = require('../config/jwt');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, config.jwt.accessTokenSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
};

const authorizeRole = (req, res, next) => {
  // Check if user's role is admin
  if (req.user.role === 'admin') {
    next(); // Allow access to the route
  } else {
    res.status(403).json({ error: 'Access denied' }); // Send 403 Forbidden response
  }
};


module.exports = {
  authenticateToken,
  authorizeRole
};
