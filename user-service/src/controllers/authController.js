const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../utils/jwt');
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @route   POST /api/auth/register
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });
    res.status(201).json({
      status: 'success',
      data: {
        userId: user._id,
        username: user.username,
        email: user.email,
        balance: user.balance,
        token: generateToken(user),
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// @route   POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ status: 'fail', message: 'Invalid credentials' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        userId: user._id,
        username: user.username,
        email: user.email,
        balance: user.balance,
        token: generateToken(user),
      },
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.protect = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Token is not valid' });
  }

  req.userId = decoded.id;
  next();
};
