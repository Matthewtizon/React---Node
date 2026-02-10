// user model

function createUserModel(name, age) {
    return {
        id: Date.now().toString(),
        name,
        age
    };
}

module.exports = { createUserModel };
