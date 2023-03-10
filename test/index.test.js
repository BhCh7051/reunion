// Description: This file contains the tests for the API endpoints
request = require("supertest");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app.js");
// const server = "https://social-media-reunion.onrender.com";
const should = chai.should();

chai.use(chaiHttp);
let rootJwtToken,
    user_id = "63a3e3df6ca6d3824fc3eca2",
    authenticatedUser_id = "63a3e55a4a82405246ae8803",
    post_id,
    anotherPost_id = "63a3f225c230cf06a8b1bdd1";

describe("POST /api/authenticate", () => {
    it("should return an error if the email is missing", (done) => {
        chai.request(server)
            .post("/api/authenticate")
            .send({
                password: "password",
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("error").eql("Email is required");
                done();
            });
    });

    it("should return an error if the password is incorrect", (done) => {
        chai.request(server)
            .post("/api/authenticate")
            .send({
                email: "test@example.com",
                password: "incorrect",
            })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have
                    .property("error")
                    .eql("Incorrect password");
                done();
            });
    });

    it("should authenticate a user and return a JWT token", (done) => {
        chai.request(server)
            .post("/api/authenticate")
            .send({
                email: "test@example.com",
                password: "password",
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("token");
                res.body.token.should.be.a("string");
                rootJwtToken = `Bearer ${res.body.token}`;
                done();
            });
    });
});

describe("POST /api/follow/:user_id", () => {
    it("should allow the authenticated user to follow another user with the given id", (done) => {
        chai.request(server)
            .post(`/api/follow/${user_id}`)
            .set("Authorization", rootJwtToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("success").eql(true);
                done();
            });
    });

    it("should return an error if the user is already following the user", (done) => {
        chai.request(server)
            .post(`/api/follow/${user_id}`)
            .set("Authorization", rootJwtToken)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have
                    .property("error")
                    .eql("You are already following this user");
                done();
            });
    });

    it("should return an error if the user is trying to follow themselves", (done) => {
        chai.request(server)
            .post(`/api/follow/${authenticatedUser_id}`)
            .set("Authorization", rootJwtToken)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have
                    .property("error")
                    .eql("You cannot follow yourself");
                done();
            });
    });

    it("should return an error if the user not found", (done) => {
        chai.request(server)
            .post(`/api/follow/notaUserID`)
            .set("Authorization", rootJwtToken)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("error").eql("User not found");
                done();
            });
    });
});

describe("POST /api/unfollow/:user_id", () => {
    it("should allow the authenticated user to unfollow a user with the given id", (done) => {
        chai.request(server)
            .post(`/api/unfollow/${user_id}`)
            .set("Authorization", rootJwtToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("success").eql(true);
                done();
            });
    });

    it("should return an error if the user is not following the user", (done) => {
        chai.request(server)
            .post(`/api/unfollow/${user_id}`)
            .set("Authorization", rootJwtToken)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have
                    .property("error")
                    .eql("You are not following this user");
                done();
            });
    });

    it("should return an error if the user d not found", (done) => {
        chai.request(server)
            .post(`/api/unfollow/notaUserID`)
            .set("Authorization", rootJwtToken)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("error").eql("User not found");
                done();
            });
    });
});

describe("GET /api/user", () => {
    it("should allow the authenticated user to retrieve their profile", (done) => {
        chai.request(server)
            .get("/api/user")
            .set("Authorization", rootJwtToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("name");
                res.body.should.have.property("followers");
                res.body.should.have.property("following");
                done();
            });
    });
});

describe("POST /api/posts/", () => {
    it("should allow the authenticated user to create a new post", (done) => {
        chai.request(server)
            .post("/api/posts/")
            .set("Authorization", rootJwtToken)
            .send({
                title: "Test Post",
                description: "This is a test post",
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("id");
                res.body.should.have.property("title").eql("Test Post");
                res.body.should.have
                    .property("description")
                    .eql("This is a test post");
                res.body.should.have.property("created_at");
                post_id = res.body.id;
                done();
            });
    });

    it("should return an error if the title is not provided", (done) => {
        chai.request(server)
            .post("/api/posts/")
            .set("Authorization", rootJwtToken)
            .send({
                description: "This is a test post", // missing title
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have
                    .property("error")
                    .eql("Title and description are required");
                done();
            });
    });

    it("should return an error if the description is not provided", (done) => {
        chai.request(server)
            .post("/api/posts/")
            .set("Authorization", rootJwtToken)
            .send({
                title: "This is a test post", //missing description
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have
                    .property("error")
                    .eql("Title and description are required");
                done();
            });
    });
});

describe("POST /api/like/:post_id", () => {
    it("should allow the authenticated user to like a post with the given id", (done) => {
        chai.request(server)
            .post(`/api/like/${anotherPost_id}`)
            .set("Authorization", rootJwtToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("success").eql(true);
                done();
            });
    });

    it("should return an error if the user has already liked the post", (done) => {
        chai.request(server)
            .post(`/api/like/${anotherPost_id}`)
            .set("Authorization", rootJwtToken)
            .end((err, res) => {
                res.should.have.status(409);
                res.body.should.have
                    .property("error")
                    .eql("Post already liked");
                done();
            });
    });

    it("should return an error if the post is not found", (done) => {
        chai.request(server)
            .post(`/api/like/notaPostID`)
            .set("Authorization", rootJwtToken)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("error").eql("Post not found");
                done();
            });
    });

    it("should return an error if the user is author of the post", (done) => {
        chai.request(server)
            .post(`/api/like/${post_id}`)
            .set("Authorization", rootJwtToken)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.have
                    .property("message")
                    .eql("You cannot like your own post");
                done();
            });
    });
});

describe("POST /api/unlike/:post_id", () => {
    it("should allow the authenticated user to unlike a post with the given id", (done) => {
        chai.request(server)
            .post(`/api/unlike/${anotherPost_id}`)
            .set("Authorization", rootJwtToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("success").eql(true);
                done();
            });
    });

    it("should return an error if the user has not liked the post", (done) => {
        chai.request(server)
            .post(`/api/unlike/${anotherPost_id}`)
            .set("Authorization", rootJwtToken)
            .end((err, res) => {
                res.should.have.status(409);
                res.body.should.have.property("error").eql("Post not liked");
                done();
            });
    });
});

describe("POST /api/comment/:post_id", () => {
    it("should allow the authenticated user to add a comment to a post with the given id", (done) => {
        chai.request(server)
            .post(`/api/comment/${post_id}`)
            .set("Authorization", rootJwtToken)
            .send({
                comment: "This is a test comment",
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("id");
                done();
            });
    });

    it("should return an error if the comment is not provided", (done) => {
        chai.request(server)
            .post(`/api/comment/${post_id}`)
            .set("Authorization", rootJwtToken)
            .send({
                // missing comment
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have
                    .property("error")
                    .eql("Comment is required");
                done();
            });
    });
});

describe("GET /api/posts/:post_id", () => {
    it("should allow a single post to be retrieved, along with its number of likes and comments", (done) => {
        chai.request(server)
            .get(`/api/posts/${post_id}`)
            .set("Authorization", rootJwtToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("id");
                res.body.should.have.property("title");
                res.body.should.have.property("description");
                res.body.should.have.property("created_at");
                res.body.should.have.property("comments");
                res.body.should.have.property("likes");
                done();
            });
    });
});

describe("DELETE /api/posts/:{post_id}", () => {
    it("should allow the authenticated user to delete a post", (done) => {
        chai.request(server)
            .delete(`/api/posts/${post_id}`)
            .set("Authorization", rootJwtToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("success").eql(true);
                done();
            });
    });

    it("should return an error if the post does not exist", (done) => {
        chai.request(server)
            .delete(`/api/posts/${post_id}`)
            .set("Authorization", rootJwtToken)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("error").eql("Post not found");
                done();
            });
    });
});

describe("GET /api/all_posts", () => {
    it("should allow all posts created by the authenticated user to be retrieved, sorted by post time", (done) => {
        chai.request(server)
            .get("/api/all_posts")
            .set("Authorization", rootJwtToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
                res.body.forEach((post) => {
                    post.should.have.property("id");
                    post.should.have.property("title");
                    post.should.have.property("description");
                    post.should.have.property("created_at");
                    post.should.have.property("comments");
                    post.should.have.property("likes");
                });
                done();
            });
    });
});
