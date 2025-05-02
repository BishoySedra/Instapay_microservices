const { verifyToken } = require('../utils/jwt');

const protect = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Token is not valid' });
  }

  req.userId = decoded.userId;
  next();
};

module.exports = { protect };
