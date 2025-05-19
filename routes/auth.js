const express = require('express');
const router = express.Router();

const jwt = require('../utils/jwt');
const hash = require('../utils/hash');

const { getUserByUsername, createUser } = require('../database/users');

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) return res.status(400).json({ success: false, data: { message: 'Missing required fields' } });
        if (username.length < 3) return res.status(400).json({ success: false, data: { message: 'Username must by at least 3 characters' } });
        if (password.length < 6) return res.status(400).json({ success: false, data: { message: 'Password must by at least 6 characters' } });
    
        const existingUser = await getUserByUsername(username);
        if (existingUser) {
            return res.status(409).json({ success: false, data: { message: 'Username already taken' } });
        }

        const hashedPassword = await hash.hashPassword(password);

        const newUser = await createUser({
            username,
            password: hashedPassword
        });

        const payload = {
            id: newUser._id,
            username: newUser.username
        };

        const token = jwt.generateToken(payload);

        return res.status(201).json({ success: true, data: { token } })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, data: { message: 'Internal server error', error: error.message } });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await getUserByUsername(username);
        if (!user) {
            return res.status(401).json({ success: false, data: { message: 'Invalid credentials' } });
        }

        const isMatch = hash.comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, data: { message: 'Invalid credentials' } });
        }

        const payload = {
            id: user._id,
            username: user.username
        };

        const token = jwt.generateToken(payload);
        
        return res.status(200).json({ success: true, data: { token } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, data: { message: 'Internal server error', error: error.message } });
    }
});

module.exports = router;