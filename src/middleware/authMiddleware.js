/** @format */

const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]; // Extract the token after "Bearer"
    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json('Invalid token');
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json('No token provided');
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(403).json('Forbidden. Admin is only authorize');
    next();
  };
};

module.exports = { authenticate, authorize };
