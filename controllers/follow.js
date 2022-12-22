// Description: This file contains controller for following and unfollowing users
const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("../config/jwt");

// Follow a user
async function follow(req, res) {
    const { user_id } = req.user;
    const { id } = req.params;

    const valid = mongoose.isValidObjectId(id);

    // Check that the user ID is valid
    if (!valid) {
        //consider this bad input, record not found.
        return res.status(404).json({ error: "User not found" });
    }
    // Find the authenticated user and the user being followed
    const [authUser, followUser] = await Promise.all([
        User.findById(user_id),
        User.findById(id),
    ]);

    // Check that both users exist
    if (!authUser || !followUser) {
        return res.status(404).json({ error: "User not found" });
    }

    // Check that the authenticated user is not following themselves
    if (authUser._id.equals(followUser._id)) {
        return res.status(400).json({ error: "You cannot follow yourself" });
    }
    // Check that the authenticated user is not already following the user
    if (authUser.followings.some((userId) => userId.equals(followUser._id))) {
        return res
            .status(400)
            .json({ error: "You are already following this user" });
    }
    // Add the followed user's ID to the authenticated user's followings list
    authUser.followings.push(followUser._id);
    await authUser.save();

    // Add the authenticated user's ID to the followed user's followers list
    followUser.followers.push(authUser._id);
    await followUser.save();

    res.json({ message: "Followed user successfully", success: true });
}

// Unfollow a user
async function unfollow(req, res) {
    const { user_id } = req.user;
    const { id } = req.params;

    const valid = mongoose.isValidObjectId(id);

    // Check that the user ID is valid
    if (!valid) {
        //consider this bad input, record not found.
        return res.status(404).json({ error: "User not found" });
    }
    // Find the authenticated user and the user being unfollowed
    const [authUser, unfollowUser] = await Promise.all([
        User.findById(user_id),
        User.findById(id),
    ]);

    // Check that both users exist
    if (!authUser || !unfollowUser) {
        return res.status(404).json({ error: "User not found" });
    }

    // Check that the authenticated user is unfollowing followed user
    if (
        !authUser.followings.some((userId) => userId.equals(unfollowUser._id))
    ) {
        return res
            .status(400)
            .json({ error: "You are not following this user" });
    }

    // Remove the unfollowed user's ID from the authenticated user's followings list
    authUser.followings = authUser.followings.filter(
        (userId) => !userId.equals(unfollowUser._id)
    );
    await authUser.save();

    // Remove the authenticated user's ID from the unfollowed user's followers list
    unfollowUser.followers = unfollowUser.followers.filter(
        (userId) => !userId.equals(authUser._id)
    );
    await unfollowUser.save();

    res.json({ message: "Unfollowed user successfully", success: true });
}

module.exports = {
    follow,
    unfollow,
};
