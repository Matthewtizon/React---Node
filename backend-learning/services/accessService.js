async function hasAccess(user) {
    if (user.name === '' || typeof user.age !== 'number' || user.age <= 0) {
        return false;
    } else {
        return user.age >= 18;
    }
    
}

module.exports = { hasAccess };