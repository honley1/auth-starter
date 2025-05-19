const express = require('express');
const router = express.Router();

const { getUser } = require('../database/users');

router.get('/me', async (req, res) => {
    try {
        const id = req.user.id;

        const user = await getUser(id);

        return res.status(200).json({ success: true, data: { user } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, data: { message: 'Internal server error', error: error.message } });
    }
});

module.exports = router;