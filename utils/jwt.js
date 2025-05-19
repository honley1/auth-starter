require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateToken(payload) {
  return jwt.sign(payload, process.env.SECRET, { expiresIn: '7d' });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.SECRET);
}

module.exports = {
  generateToken,
  verifyToken,
  TokenExpiredError: jwt.TokenExpiredError,
  JsonWebTokenError: jwt.JsonWebTokenError,
};
