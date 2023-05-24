const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const BlacklistedToken = require('../models/blacklistedToken');

const isLogin = (req, res, next) => {
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

const isAdmin = (req, res, next) => {
  // Check if user's role is admin
  if (req.user.role === 'admin') {
    next(); // Allow access to the route
  } else {
    res.status(403).json({ error: 'Access denied' }); // Send 403 Forbidden response
  }
};

const isLogout = async (req, res, next) => {
  const { authorization } = req.headers;

  // Check if the authorization header is present
  if (!authorization) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const token = authorization.split(' ')[1]; // Extract the token from the "Bearer <token>" format

    // Check if the token is blacklisted
    const blacklistedToken = await BlacklistedToken.findOne({ where: { token } });
    if (blacklistedToken) {
      return res.status(401).json({ error: 'Logged out.' });
    }

    next();
  } catch (error) {
    console.error('Error validating token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  isLogin,
  isAdmin,
  isLogout
};
