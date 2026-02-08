const users = [];


async function hasAccess(user) {
    if (user.name === '' || typeof user.age !== 'number' || user.age <= 0) {
        return false;
    } else {
        return user.age >= 18;
    }
    
}

async function getAllUsers() {
    return [...users];
}


async function addUser(user) {
    if (typeof user.name !== "string" || !user.name || typeof user.age !== 'number' ) {
        return false;
    } else {
        users.push(user);
        return true;
    }
}

module.exports = { hasAccess, addUser, getAllUsers };