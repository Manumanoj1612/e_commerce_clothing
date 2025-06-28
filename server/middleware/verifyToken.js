// Example inside your middleware (you already have something like this)
const { verifyToken } = require('../jwt/jwt');

const verifyTokenMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = verifyToken(token);
    req.user = {
      _id: decoded.sub,
      username: decoded.username,
      email: decoded.email,
      role: decoded.role,
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = verifyTokenMiddleware;
