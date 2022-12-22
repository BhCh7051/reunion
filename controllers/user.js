const bcrypt = require("bcryptjs");
const jwt = require("../config/jwt");
const User = require("../models/user");

async function createUser(req, res) {
    const { name, email, password } = req.body;

    // Create a new user
    const user = await User.findOne({ email });
    if (user) {
        res.status(401).json({
            email: email,
            user_creation: "failed",
            reason: "email already exists",
        });
        return;
    }
    const newUser = new User({ name, email, password });
    // Save the user to the database
    await newUser.save();
    res.json({
        id: newUser._id,
        email: newUser.email,
        user_creation: "success",
    });
}

async function userInfo(req, res) {
    const { user_id } = req.user;
    const user = await User.findById(user_id)
        .populate("followers")
        .populate("followings");

    res.json({
        name: user.name,
        followers: user.followers.length,
        following: user.followings.length,
    });
}

module.exports = {
    createUser,
    userInfo,
};
