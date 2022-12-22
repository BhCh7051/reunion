const mongoose = require("mongoose");
const Post = require("../models/post");
const User = require("../models/user");
const jwt = require("../config/jwt");

async function createPost(req, res) {
    const { user_id } = req.user;
    const { title, description } = req.body;

    // Check that the title and description are provided
    if (!title || !description) {
        return res
            .status(400)
            .json({ error: "Title and description are required" });
    }

    // Create a new post document
    const post = new Post({ user_id, title, description });

    // Save the post to the database
    await post.save();

    // Find the user who created the post
    const user = await User.findById(user_id);

    // Add the post ID to the user's posts list
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    user.posts.push(post._id);
    await user.save();

    res.json({
        id: post._id,
        title: post.title,
        description: post.description,
        created_at: post.created_at,
    });
}

async function deletePost(req, res) {
    const { user_id } = req.user;
    const { id } = req.params;

    const valid = mongoose.isValidObjectId(id);

    // Check that the post ID is valid
    if (!valid) {
        //consider this bad input, record not found.
        return res.status(404).json({ error: "Post not found" });
    }
    // Find the post to delete
    const post = await Post.findById(id);
    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }

    // Check that the authenticated user is the owner of the post
    if (!post.user_id.equals(user_id)) {
        return res.status(403).json({ error: "Forbidden" });
    }

    // Delete the post from the database
    await post.remove();

    // Find the user who created the post
    const user = await User.findById(user_id);

    // Remove the post ID from the user's posts list
    user.posts = user.posts.filter((post_id) => !post._id.equals(post_id));

    // Save the changes to the database
    await user.save();

    res.json({ message: "Post deleted successfully", success: true });
}

async function getPost(req, res) {
    const { id } = req.params;

    const valid = mongoose.isValidObjectId(id);

    // Check that the post ID is valid
    if (!valid) {
        //consider this bad input, record not found.
        return res.status(404).json({ error: "Post not found" });
    }

    // Find the post and populate the comments and likes fields
    const post = await Post.findById(id)
        .populate("comments.user_id", "name")
        .populate("likes", "name");

    // Check that the post exists
    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }

    res.json({
        id: post._id,
        title: post.title,
        description: post.description,

        created_at: post.created_at,
        comments: post.comments,
        likes: post.likes.length,
    });
}

async function getAllPosts(req, res) {
    const { user_id } = req.user;

    // Find the authenticated user and their posts
    const user = await User.findById(user_id).populate(
        "posts",
        "title description created_at"
    );
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    // For each post, populate the comments and likes fields

    const posts = await Promise.all(
        user.posts.map(async (post) => {
            const comments = await Post.findById(post._id).populate(
                "comments.user_id",
                "name"
            );
            const likes = await Post.findById(post._id).populate(
                "likes",
                "name"
            );
            return {
                id: post._id,
                title: post.title,
                description: post.description,
                created_at: post.created_at,
                comments: comments.comments,
                likes: likes.likes.length,
            };
        })
    );

    // Sort the posts by creation date in descending order
    posts.sort((a, b) => b.created_at - a.created_at);

    res.json(posts);
}

module.exports = {
    getPost,
    getAllPosts,
    createPost,
    deletePost,
};
