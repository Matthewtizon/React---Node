const express = require('express');
const router = express.Router();

// Import business logic
const {
    hasAccess,
    addUser,
    getAllUsers,
    updateUser,
    deleteUser
} = require('../services/accessService');

// Import model creator
const { createUserModel } = require('../models/user');

/*
  Standardized response helper
  - Keeps responses consistent
  - Avoids repetition
*/
function response(status, message, res) {
    return res.status(status).json({ message });
}

/*
  GET all users
  - No validation needed
*/
router.get('/list-users', async (req, res) => {
    const users = await getAllUsers();
    return res.json(users);
});

/*
  CREATE user
  - Validate input
  - Create model
  - Call service
*/
router.post('/add-user', async (req, res) => {
    const { name, age } = req.body;

    // Input validation (controller responsibility)
    if (
        typeof name !== "string" ||
        name.trim() === "" ||
        typeof age !== 'number' ||
        age <= 0
    ) {
        return response(400, 'invalid', res);
    }

    // Model creation (data shape + ID)
    const user = createUserModel(name, age);

    // Business logic
    const added = await addUser(user);

    if (!added) {
        return response(400, 'denied to add', res);
    }

    return response(200, 'added new user', res);
});

/*
  UPDATE user
  - ID comes from URL
  - Updates come from body
  - Partial updates allowed
*/
router.put('/edit-user/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;

    // Validate ID existence
    if (!id) {
        return response(400, 'invalid id', res);
    }

    // Must update at least one field
    if (!name && !age) {
        return response(400, 'No Name and Age', res);
    }

    // Build updates object (NOT a model)
    const updates = { name, age };

    const updated = await updateUser(id, updates);

    if (!updated) {
        return response(404, 'user not found', res);
    }

    return response(200, 'successfully updated', res);
});

/*
  DELETE user
  - ID only
*/
router.delete('/delete-user/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return response(400, 'Invalid Id', res);
    }

    const deleted = await deleteUser(id);

    if (!deleted) {
        return response(400, 'unable to delete', res);
    }

    return response(200, 'successfully deleted', res);
});

// Export router
module.exports = router;
