const Post = require("../models/post");
const User = require("../models/user");
const jwt = require("../config/jwt");

async function addComment(req, res) {
    const { user_id } = req.user;
    const { id } = req.params;
    const { comment } = req.body;

    // Find the post and the user who is commenting on the post
    const [post, user] = await Promise.all([
        Post.findById(id),
        User.findById(user_id),
    ]);
    if (!post || !user) {
        return res.status(404).json({ error: "Post or user not found" });
    }

    // Add the comment to the post's comments list
    const newComment = { user_id: user._id, comment };
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
