const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/jwt');
const User = require('../models/user');
const BlacklistedToken = require('../models/blacklistedToken');
const { Sequelize } = require('sequelize');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

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
    const newUser = await User.create({ username, email, password: hashedPassword, role });

    // Generate access token
    const accessToken = jwt.sign({ id: newUser.id, username: newUser.username, role: newUser.role }, config.jwt.accessTokenSecret, {
      expiresIn: config.jwt.accessTokenExpiresIn,
    });

    res.json({ accessToken });
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
    const accessToken = jwt.sign({ id: user.id, username: user.username, role: user.role  }, config.jwt.accessTokenSecret, {
      expiresIn: config.jwt.accessTokenExpiresIn,
    });

    res.json({ accessToken });
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

const googleAuthCallback = async (accessToken, refreshToken, profile, done) => {
  try {
    // Find or create a user based on the Google profile
    const [user, created] = await User.findOrCreate({
      where: { googleId: profile.id },
      defaults: {
        username: profile.displayName,
        email: profile.emails[0].value,
        password: '',
        role: 'member'
      }
    });

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

const authenticateGoogle = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/auth/google/callback`
    },
    googleAuthCallback
  )
);

// Middleware for handling the OAuth callback
const handleOAuthCallback = (req, res, next) => {
  passport.authenticate('google', { session: false }, async (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error', details: err.message });
    }

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    try {
      // Generate access token using JWT or perform necessary actions with user profile
      const accessToken = jwt.sign({ id: user.id, email: user.email }, config.jwt.accessTokenSecret, {
        expiresIn: config.jwt.accessTokenExpiresIn,
      });

      // Send the access token as a response
      res.json({ accessToken });

    } catch (error) {
      return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  })(req, res, next);
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authenticateGoogle,
  handleOAuthCallback,
  googleAuthCallback
};
