const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/jwt');
const User = require('../models/user');
const BlacklistedToken = require('../models/blacklistedToken');
const { Sequelize } = require('sequelize');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({
      where: {
        [Sequelize.Op.or]: [{ username }, { email }],
      },
    });
    if (existingUser) {
      return res.status(409).json({ error: 'Username or email already exists' });
    }

    // Create a new user
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });

    // Generate access token
    const accessToken = jwt.sign({ id: newUser.id, username: newUser.username }, config.jwt.accessTokenSecret, {
      expiresIn: config.jwt.accessTokenExpiresIn,
    });

    // Generate refresh token
    const refreshToken = jwt.sign({ id: newUser.id, username: newUser.username }, config.jwt.refreshTokenSecret, {
      expiresIn: config.jwt.refreshTokenExpiresIn,
    });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the password
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate access token
    const accessToken = jwt.sign({ id: user.id, username: user.username }, config.jwt.accessTokenSecret, {
      expiresIn: config.jwt.accessTokenExpiresIn,
    });

    // Generate refresh token
    const refreshToken = jwt.sign({ id: user.id, username: user.username }, config.jwt.refreshTokenSecret, {
      expiresIn: config.jwt.refreshTokenExpiresIn,
    });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Logout user and invalidate token
const logoutUser = async (req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Calculate the expiration time for the token
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1); // Set the expiration time to 1 hour from now

    // Add token to blacklist
    await BlacklistedToken.create({ token, expiresAt: expirationDate });

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error logging out user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser
};
