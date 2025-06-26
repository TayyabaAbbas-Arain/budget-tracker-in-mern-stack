const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Authenticated user:', decoded.user);
    req.user = { id: decoded.userId }; // ✅ Set user ID from token
    console.log('✅ Authenticated user:', req.user); // ✅ Add this line for debugging
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
