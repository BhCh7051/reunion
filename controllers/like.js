// Description: This file contains controller functions for liking and unliking posts
const mongoose = require("mongoose");
const Post = require("../models/post");
const User = require("../models/user");
const jwt = require("../config/jwt");

// Like a post
async function likePost(req, res) {
    const { user_id } = req.user;
    const { id } = req.params;

    const valid = mongoose.isValidObjectId(id);

    // Check that the post ID is valid
    if (!valid) {
        //consider this bad input, record not found.
        return res.status(404).json({ error: "Post not found" });
    }

    // Find the post and the user who is liking the post
    const [post, user] = await Promise.all([
        Post.findById(id),
        User.findById(user_id),
    ]);

    // Check that the post and the user exist
    if (!post || !user) {
        return res.status(404).json({ error: "Post or user not found" });
    }

    // Check if the user is the author of the post
    if (post.user_id.equals(user._id)) {
        return res.status(403).json({
            error: "Forbidden",
            message: "You cannot like your own post",
        });
    }

    // Check if the user has already liked the post
    if (post.likes.some((likeId) => likeId.equals(user._id))) {
        return res.status(409).json({ error: "Post already liked" });
    }

    // Add the user's ID to the post's likes list
    post.likes.push(user._id);
    await post.save();

    res.json({ message: "Post liked successfully", success: true });
}

// Unlike a post
async function unlikePost(req, res) {
    const { user_id } = req.user;
    const { id } = req.params;

    const valid = mongoose.isValidObjectId(id);

    // Check that the post ID is valid
    if (!valid) {
        //consider this bad input, record not found.
        return res.status(404).json({ error: "Post not found" });
    }

    // Find the post and the user who is unliking the post
    const [post, user] = await Promise.all([
        Post.findById(id),
        User.findById(user_id),
    ]);

    // Check that the post and the user exist
    if (!post || !user) {
        return res.status(404).json({ error: "Post or user not found" });
    }

    // Check if the user has liked the post
    if (!post.likes.some((likeId) => likeId.equals(user._id))) {
        return res.status(409).json({ error: "Post not liked" });
    }

    // Remove the user's ID from the post's likes list
    post.likes = post.likes.filter((likeId) => !likeId.equals(user._id));
    await post.save();

    res.json({ message: "Post unliked successfully", success: true });
}

module.exports = {
    likePost,
    unlikePost,
};
