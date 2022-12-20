const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");

const should = chai.should();

chai.use(chaiHttp);

describe("POST /api/authenticate", () => {
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
                done();
            });
    });
});
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
                .eql("Incorrect email or password");
            done();
        });
});
