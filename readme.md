<p align="left"> <img src="https://komarev.com/ghpvc/?username=bhch7051&label=Profile%20views&color=0e75b6&style=flat" alt="bhch7051" /> </p>

# Social Media Platform API

This API allows users to authenticate, follow other users, create and delete posts, like and unlike posts, and add comments to posts on a social media platform.

# Database Schema

The database consists of the following collections:
![DataBase Schema](https://mermaid.ink/svg/pako:eNqFkstOwzAQRX_FmiVqFmy9bVmw4CFVrDCq3HhSDH5E9kQFVfl3Ji9KE1Vkkzt3ru0TZ05QRoMgoXQ6543Vh6S9CkL0tXjJmMSpq4UoRNAepdhSsuEweei1dXOz5rXHmMzcr6Jz8YgpS_H6tP_Aku7N22WT04tuq8IZ6TlmOiPtLB8yhSeTLLkFqMFcJluTjWHeKhNqQrPTJMWG1eQ7-4kM89j4PabfcPQeA3WQg9U9g1rCrofwf7z4RX-Zxi36y1dwq0AUBYsbFt3XS7HugfO10HjqRa6_tqu5GEjbwEFYgcfE_9TwTPTUCugdPSqQLA1WunGkQIWWo01teP87YykmkJQaXIFuKG6_QznVQ2acLJCVdpld7Nc8jLPXvdofMfnOlA)

    users: stores the user documents, with fields for the user's name, email, password, followers, and followings.

    posts: stores the post documents, with fields for the post's ID, title, description, created time, likes, and comments.

# Code Summary

The API is built using Node.js and Express.js, and connects to a MongoDB database for data storage.

The following endpoints are implemented:

    1. POST /api/authenticate: performs user authentication and returns a JWT token.

    2. POST /api/follow/{id}: follows a user with the given ID.

    3. POST /api/unfollow/{id}: unfollows a user with the given ID.

    4. GET /api/user: retrieves the authenticated user's profile.

    5. POST /api/posts/: creates a new post.

    6. DELETE /api/posts/{id}: deletes a post with the given ID.

    7. POST /api/like/{id}: likes a post with the given ID.

    8. POST /api/unlike/{id}: unlikes a liked post with the given ID.

    9. POST /api/comment/{id}: adds a comment to a post with the given ID.

    10. GET /api/posts/{id}: retrieves a single post with the given ID.

    11. GET /api/all_posts: retrieves all posts created by the authenticated user.

# Data Flow Diagram

![Data Flow Diagram](https://mermaid.ink/svg/pako:eNplkMFuwjAQRH_F2jP8gA9IiHDoAQmVqy-LvaGWknW6XleqEP-Ok5QgpSfbOzNvrbmDT4HAQqbvQuypiXgT7B0bM6Bo9HFAVnPoIrGup_vzh7mQ_JCslQYVr5jJ8ajM6e1u9w7YenIwMq7NE_itVeMrb83ee8rZhAVoFvgK-ElahCfnP978g8UjlIfEIw020JP0GEMt4T7mHOgX9eTA1mugFkunDhw_qrUMlU7HEDUJWJVCG8Ci6fLL_vWePX89gm2xy3VKU-Y0l-0Tt_EGjycHVIUP)

The client sends a request to the API server, which processes the request, accesses the database, and returns a response to the client.

```bash
project/
├── config/
│ ├── db.js (MongoDB connection configuration)
│ ├── jwt.js (JWT configuration)
│ └── index.js (Project configuration)
├── controllers/
│ ├── auth.js (API endpoint functiоns fоr user authentication)
│ ├── follow.js (API endpoint functiоns fоr following/unfollowing usеrs)
│ ├── post.js (API endpoint functiоns fоr creating/deleting posts)
│ ├── like.js (API endpoint functiоns fоr liking/unliking posts)
│ └── comment.js (API endpoint functiоns fоr commenting on posts)
├── models/
│ ├── user.js (Mongoose model fоr the Users collection)
│ └── post.js (Mongoose model fоr the Posts collection)
├── routes/
│ ├── auth.js (ExpressJS route fоr /api/authenticate)
│ ├── follow.js (ExpressJS route fоr /api/follow/_)
│ ├── post.js (ExpressJS route fоr /api/posts/_)
│ ├── like.js (ExpressJS route fоr /api/like/_)
│ └── comment.js (ExpressJS route fоr /api/comment/_)
├── tеst/ (directory fоr API tеst cases)
├── .gitignore (list of files to ignore when pushing to Git)
├── package.json (project dependencies and scripts)
└── server.js (entry point fоr the API server)
```

# Requirements

1. NodeJS (v16 or higher) for running natively.
2. Docker and Docker Compose

# Tech Stack

1. [ReactJS](https://reactjs.org/) for client side.
2. [NodeJS](https://nodejs.org/en/) for server side.
3. [Docker](https://www.docker.com/) for containerization.
4. [Docker Compose](https://docs.docker.com/compose/) for container orchestration.
5. [MongoDB](https://www.mongodb.com/) for database.

# Steps to run the plugin

## Start the docker container

```bash
docker-compose up -d
```

<h3 align="left">Connect with me:</h3>
<p align="left">
<a href="https://linkedin.com/in/bharat-chandwani" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="bharat-chandwani" height="30" width="40" /></a>
<a href="https://www.codechef.com/users/anonymous_holm" target="blank"><img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@3.1.0/icons/codechef.svg" alt="anonymous_holm" height="30" width="40" /></a>
<a href="https://www.leetcode.com/bharatchandwani" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/leet-code.svg" alt="bharatchandwani" height="30" width="40" /></a>
</p>

<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://www.docker.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://www.linux.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg" alt="linux" width="40" height="40"/> </a> <a href="https://mochajs.org" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/mochajs/mochajs-icon.svg" alt="mocha" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> </p>
