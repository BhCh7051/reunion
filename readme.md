project/
├── config/
│   ├── db.js (MongoDB connection configuration)
│   ├── jwt.js (JWT configuration)
│   └── ... (other configuration files as needed)
├── controllers/
│   ├── auth.js (API endpoint functions for user authentication)
│   ├── follow.js (API endpoint functions for following/unfollowing users)
│   ├── post.js (API endpoint functions for creating/deleting posts)
│   ├── like.js (API endpoint functions for liking/unliking posts)
│   ├── comment.js (API endpoint functions for commenting on posts)
│   └── ... (other controller files as needed)
├── models/
│   ├── user.js (Mongoose model for the Users collection)
│   ├── post.js (Mongoose model for the Posts collection)
│   └── ... (other model files as needed)
├── routes/
│   ├── auth.js (ExpressJS route for /api/authenticate)
│   ├── follow.js (ExpressJS route for /api/follow/*)
│   ├── post.js (ExpressJS route for /api/posts/*)
│   ├── like.js (ExpressJS route for /api/like/*)
│   ├── comment.js (ExpressJS route for /api/comment/*)
│   └── ... (other route files as needed)
├── test/ (directory for API test cases)
├── .gitignore (list of files to ignore when pushing to Git)
├── package.json (project dependencies and scripts)
└── server.js (entry point for the API server)
