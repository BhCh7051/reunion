// Description: This file contains all the routes for the application
const express = require("express");
const router = express.Router();

// Controllers
const auth = require("../controllers/auth");
const follow = require("../controllers/follow");
const post = require("../controllers/post");
const like = require("../controllers/like");
const comment = require("../controllers/comment");
const jwt = require("../config/jwt");
const user = require("../controllers/user");

// Routes

// Create a new user
router.post("/api/createuser", user.createUser);

// Authenticate the user
router.post("/api/authenticate", auth.authenticate);

// Follow a user with the given id
router.post("/api/follow/:id", jwt.verifyToken, follow.follow);

// Unfollow a user with the given id
router.post("/api/unfollow/:id", jwt.verifyToken, follow.unfollow);

// Get the user information of authenticated user
router.get("/api/user", jwt.verifyToken, user.userInfo);

// Create a new post for the authenticated user
router.post("/api/posts", jwt.verifyToken, post.createPost);

// Delete a post with the given id for the authenticated user
router.delete("/api/posts/:id", jwt.verifyToken, post.deletePost);

// Like a post with the given id for the authenticated user
router.post("/api/like/:id", jwt.verifyToken, like.likePost);

// Unlike a post with the given id for the authenticated user
router.post("/api/unlike/:id", jwt.verifyToken, like.unlikePost);

// Add a comment to a post with the given id for the authenticated user
router.post("/api/comment/:id", jwt.verifyToken, comment.addComment);

// Get information about a post with the given id for the authenticated user
router.get("/api/posts/:id", jwt.verifyToken, post.getPost);

// Get all the posts for the authenticated user
router.get("/api/all_posts", jwt.verifyToken, post.getAllPosts);

module.exports = router;
