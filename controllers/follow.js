const User = require("../models/user");
const jwt = require("../config/jwt");

async function follow(req, res) {
    const { user_id } = req.user;
    const { id } = req.params;

    // Find the authenticated user and the user being followed
    const [authUser, followUser] = await Promise.all([
        User.findById(user_id),
        User.findById(id),
    ]);
    if (!authUser || !followUser) {
        return res.status(404).json({ error: "User not found" });
    }

    // Add the followed user's ID to the authenticated user's followings list
    authUser.followings.push(followUser._id);
    await authUser.save();

    // Add the authenticated user's ID to the followed user's followers list
    followUser.followers.push(authUser._id);
    await followUser.save();

    res.json({ message: "Followed user successfully" });
}

async function unfollow(req, res) {
    const { user_id } = req.user;
    const { id } = req.params;

    // Find the authenticated user and the user being unfollowed
    const [authUser, unfollowUser] = await Promise.all([
        User.findById(user_id),
        User.findById(id),
    ]);
    if (!authUser || !unfollowUser) {
        return res.status(404).json({ error: "User not found" });
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

    res.json({ message: "Unfollowed user successfully" });
}

module.exports = {
    follow,
    unfollow,
};
