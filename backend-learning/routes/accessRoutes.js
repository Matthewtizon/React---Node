const express = require('express');
const router = express.Router();

const { hasAccess } = require('../services/accessService');
const { createUser } = require('../models/user');


router.post('/check-access', (req, res) => {
    const { name, age } = req.body;
    
    // input validation (controller responsibility)
    if (typeof age !== 'number') {
        return res.status(400).json({ message: 'Invalid age' });
    }

    // model creation
    const user = createUser(name, age);

    // business logic
    if (hasAccess(user)) {
        return res.json({ message: `Welcome, ${user.name}!` });
    } else {
        return res.json({ message: 'Access Denied' });
    }
});

module.exports = router;