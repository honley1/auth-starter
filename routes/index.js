const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const usersRouter = require('./users');

const authMiddleware = require('../middlewares/auth');

router.use('/auth', authRouter);
router.use('/users', authMiddleware, usersRouter);

module.exports = router;