// budget-tracker-server\middleware\authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'yourSecretKey');
    // decoded = { userId: '...' }
    req.user = { id: decoded.userId };  // ✅ attach `id`
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
