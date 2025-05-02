const jwt = require('jsonwebtoken');

// Verify JWT token
const verifyToken = (token) => {
  try {
    console.log(process.env.JWT_SECRET);
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = { verifyToken };
