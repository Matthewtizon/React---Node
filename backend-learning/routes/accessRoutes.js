const express = require('express');
const router = express.Router();

const { hasAccess, addUser, getAllUsers } = require('../services/accessService');
const { createUser } = require('../models/user');


function response(status, message, res) {
    return res.status(status).json({ message: message });
}

router.get('/list-users', async (req, res) => {
    const users = await getAllUsers();
    return res.json(users);
});

router.post('/add-user', async (req, res) => {
    const { name, age } = req.body;

    // validation input 
    if (name === '' || typeof name !== "string" || typeof age !== 'number' || age <= 0 ) {
        return response(400, 'invalid', res);
    }

    // model creation
    const user = createUser(name, age);

    // business logic
    const added = await addUser(user);
    
    if (!added) {
        return res.json({ message: "denied to add"})
           
    } else {
        return res.json({ message: "added new user"}) 
    }
});

module.exports = router;