const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config");
const jwtSecret = JWT_SECRET;
const expiry = JWT_EXPIRES_IN;

function signToken(payload) {
    return jwt.sign(payload, jwtSecret, { expiresIn: expiry });
}

function verifyToken(token) {
    return jwt.verify(token, jwtSecret);
}

module.exports = {
    signToken,
    verifyToken,
};
