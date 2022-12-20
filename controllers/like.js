const Post = require("../models/post");
const User = require("../models/user");
const jwt = require("../config/jwt");

async function likePost(req, res) {
    const { user_id } = req.user;
    const { id } = req.params;

    // Find the post and the user who is liking the post
    const [post, user] = await Promise.all([
        Post.findById(id),
        User.findById(user_id),
    ]);
    if (!post || !user) {
        return res.status(404).json({ error: "Post or user not found" });
    }

    // Check if the user has already liked the post
    if (post.likes.some((likeId) => likeId.equals(user._id))) {
        return res.status(409).json({ error: "Post already liked" });
    }

    // Add the user's ID to the post's likes list
    post.likes.push(user._id);
    await post.save();

    res.json({ message: "Post liked successfully" });
}

async function unlikePost(req, res) {
    const { user_id } = req.user;
    const { id } = req.params;

    // Find the post and the user who is unliking the post
    const [post, user] = await Promise.all([
        Post.findById(id),
        User.findById(user_id),
    ]);
    if (!post || !user) {
        return res.status(404).json({ error: "Post or user not found" });
    }

    // Check if the user has already liked the post
    if (!post.likes.some((likeId) => likeId.equals(user._id))) {
        return res.status(409).json({ error: "Post not liked" });
    }

    // Remove the user's ID from the post's likes list
    post.likes = post.likes.filter((likeId) => !likeId.equals(user._id));
    await post.save();

    res.json({ message: "Post unliked successfully" });
}

module.exports = {
    likePost,
    unlikePost,
};
