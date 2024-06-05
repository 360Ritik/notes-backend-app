const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');




const validateUsername = (username) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(username);
};


const validatePassword = (password) => {
  // Regular expression for password format validation
  // At least 6 characters long, contains at least one lowercase letter, one uppercase letter, one digit, and one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return passwordRegex.test(password);
};

exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password } = req.body;

    
    if (!validateUsername(username)) {
      return res.status(400).json({ message: 'Invalid email address format' });
    }

    
    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ username, password });
    await user.save();
    res.status(201).send('Successfully registered');
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).send('Invalid credentials');
    }
    req.session.userId = user.user_id;
    res.status(200).send('Logged in');
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send(err);
    res.send('Logged out');
  });
};
