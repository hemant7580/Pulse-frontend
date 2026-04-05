const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || '7d',
  });

const signup = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ message: 'Email, username, and password are required' });
    }
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({
      email: email.toLowerCase().trim(),
      username: username.trim(),
      password: hashed,
    });
    const token = signToken(user._id);
    res.status(201).json({
      token,
      user: {
        id: String(user._id),
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = signToken(user._id);
    res.json({
      token,
      user: {
        id: String(user._id),
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, login };
