const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config");
const jwtSecret = JWT_SECRET;
const expiry = JWT_EXPIRES_IN;

function signToken(payload) {
    return jwt.sign(payload, jwtSecret, { expiresIn: expiry });
}


function verifyToken(req, res, next) {
    const header = req.headers["authorization"];
    if (typeof header !== "undefined") {
        const bearer = header.split(" ");
        const token = bearer[1];
        try {
            jwt.verify(token, jwtSecret);
            req.user = jwt.verify(token, jwtSecret);
            next();
        } catch (err) {
            res.status(401).json("Token not valid, please authenticate again");
            return;
        }
    } else {
        res.sendStatus(403);
    }
}

module.exports = {
    signToken,
    verifyToken,
};
