const jwt = require('../utils/jwt');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            data: { message: 'Missing token' }
        });
    }

    const payload = jwt.verifyToken(token);

    req.user = payload;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
            success: false,
            data: { message: 'Token expired' }
        });
    }

    if (error instanceof jwt.JsonWebTokenError) {
        return res.status(403).json({
            success: false,
            data: { message: 'Token is invalid' }
        });
    }

    return res.status(500).json({
        success: false,
        data: { message: 'Internal server error', error: error.message }
    });
  }
};
