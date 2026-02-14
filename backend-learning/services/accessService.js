// In-memory data store (temporary, will be replaced by DB in Day 6)
//const users = [];


// connect to database 
const pool = require('../db/index');

/*
  Checks if a user is allowed access.
  - This is PURE business logic
  - No HTTP, no Express, no responses here
*/
async function hasAccess(user) {
    // Basic sanity validation
    if (user.name === '' || typeof user.age !== 'number' || user.age <= 0) {
        return false;
    }

    // Actual access rule
    return user.age >= 18;
}

/*
  Returns all users.
  - Returns a COPY to prevent external mutation
  - Very important backend habit
*/
async function getAllUsers() {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
}

/*
  Adds a new user to storage.
  - Expects a FULL user object (id, name, age)
  - Returns boolean only
*/
async function addUser(user) {
    // Validate user object
    if (
        typeof user.name !== "string" ||
        user.name.trim() === "" ||
        typeof user.age !== 'number'
    ) {
        return false;
    }

    const query = `
    INSERT INTO users (name, age)
    VALUES ($1, $2)
    RETURNING *
    `;
    
    const result = await pool.query(query, [user.name, user.age]);
    return result.rows[0];
}

/*
  Updates an existing user by ID.
  - ID identifies the user
  - updates is a PARTIAL object { name?, age? }
*/
async function updateUser(id, updates) {
    const field = [];
    const values = [];
    let index = 1;
    
     // Update allowed fields only
    if (typeof updates.name === 'string' && updates.name.trim() !== '') {
        field.push(`name = $${index}`);
        values.push(updates.name);
        index++;
    }

    if (typeof updates.age === 'number' && updates.age > 0) {
        field.push(`age = $${index}`);
        values.push(updates.age);
        index++
    }

    if (field.length === 0) {
        return false;
    }

    values.push(id)

    const query = `
    UPDATE users
    SET ${field.join(', ')}
    WHERE id = $${index}
    `;

    const result = await pool.query(query, values)

    return result.rowCount > 0;
}

/*
  Deletes a user by ID.
  - Finds index
  - Removes exactly one user
*/
async function deleteUser(id) {
    const query = `
        DELETE FROM users
        WHERE id = $1
    `;
    
    const result = await pool.query(query, [id]);
    return result.rowCount > 0;
}

// Export service functions
module.exports = {
    hasAccess,
    addUser,
    getAllUsers,
    updateUser,
    deleteUser
};
