const express = require('express');
const router = express.Router();

const { hasAccess } = require('../services/accessService');
const { createUser } = require('../models/user');


function response(status, message, res) {
    return res.status(status).json({ message: message });
}

router.post('/check-access', async (req, res) => {
    const { name, age } = req.body;
    
    // input validation (controller responsibility)
    if (typeof age !== 'number' || typeof name !== 'string' || name === '' || age <= 0) {
        return response(400, "Invalid age and image", res);
    }

    // model creation
    const user = createUser(name, age);

    // business logic
    const allowed = await hasAccess(user);

    if (allowed) {
        return res.json({ message: `Welcome, ${user.name}!` });
    } else {
        return res.json({ message: 'Access Denied' });
    }
});

module.exports = router;