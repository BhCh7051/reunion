const mongoose = require("mongoose");
const Post = require("../models/post");
const User = require("../models/user");
const jwt = require("../config/jwt");

async function addComment(req, res) {
    const { user_id } = req.user;
    const { id } = req.params;
    const { comment } = req.body;

    const valid = mongoose.isValidObjectId(id);

    // Check that the post ID is valid
    if (!valid) {
        //consider this bad input, record not found.
        return res.status(404).json({ error: "Post not found" });
    }
    
    // Check that the comment is provided
    if (!comment) {
        return res.status(400).json({ error: "Comment is required" });
    }

    // Find the post and the user who is commenting on the post
    const [post, user] = await Promise.all([
        Post.findById(id),
        User.findById(user_id),
    ]);

    // Check that the post and the user exist
    if (!post || !user) {
        return res.status(404).json({ error: "Post or user not found" });
    }

    // Add the comment to the post's comments list
    const newComment = post.comments.create({ user_id: user._id, comment });
    post.comments.push(newComment);
    await post.save();
    res.json({
        id: newComment._id,
        comment: newComment.comment,
        created_at: newComment.created_at,
    });
}

module.exports = {
    addComment,
};
