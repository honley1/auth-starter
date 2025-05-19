const User = require("../models/User")

async function createUser(user) {
    const newUser = new User(user);
    return newUser.save();
}

async function getUser(id) {
    return await User.findById(id).select('-password -__v');
}

async function getUserByUsername(username) {
    return await User.findOne({ username })
}

module.exports = { createUser, getUser, getUserByUsername }