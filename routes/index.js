const express = require("express");
const router = express.Router();

const auth = require("../controllers/auth");
const follow = require("../controllers/follow");
const post = require("../controllers/post");
const like = require("../controllers/like");
const comment = require("../controllers/comment");
const jwt = require("../config/jwt");
const user = require("../controllers/user");

router.post("/api/createuser", user.createUser);

router.post("/api/authenticate", auth.authenticate);
router.post("/api/follow/:id", jwt.verifyToken, follow.follow);
router.post("/api/unfollow/:id", jwt.verifyToken, follow.unfollow);
router.get("/api/user", jwt.verifyToken, user.userInfo);
router.post("/api/posts", jwt.verifyToken, post.createPost);
router.delete("/api/posts/:id", jwt.verifyToken, post.deletePost);
router.post("/api/like/:id", jwt.verifyToken, like.likePost);
router.post("/api/unlike/:id", jwt.verifyToken, like.unlikePost);
router.post("/api/comment/:id", jwt.verifyToken, comment.addComment);
router.get("/api/posts/:id", jwt.verifyToken, post.getPost);
router.get("/api/all_posts", jwt.verifyToken, post.getAllPosts);

module.exports = router;
