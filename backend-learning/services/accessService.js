// In-memory data store (temporary, will be replaced by DB in Day 6)
const users = [];

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
    return [...users];
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

    // Persist user
    users.push(user);
    return true;
}

/*
  Updates an existing user by ID.
  - ID identifies the user
  - updates is a PARTIAL object { name?, age? }
*/
async function updateUser(id, updates) {
    // Find user by ID
    const user = users.find(u => u.id === id);

    // If user does not exist
    if (!user) {
        return false;
    }

    // Update allowed fields only
    if (typeof updates.name === 'string' && updates.name.trim() !== '') {
        user.name = updates.name;
    }

    if (typeof updates.age === 'number' && updates.age > 0) {
        user.age = updates.age;
    }

    return true;
}

/*
  Deletes a user by ID.
  - Finds index
  - Removes exactly one user
*/
async function deleteUser(id) {
    const index = users.findIndex(u => u.id === id);

    // If user not found
    if (index === -1) {
        return false;
    }

    users.splice(index, 1);
    return true;
}

// Export service functions
module.exports = {
    hasAccess,
    addUser,
    getAllUsers,
    updateUser,
    deleteUser
};
