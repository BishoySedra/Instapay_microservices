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
  console.log('protected');
  next();
};

