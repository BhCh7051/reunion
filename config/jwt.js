// const jwt = require("jsonwebtoken");
// const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config");
// const jwtSecret = JWT_SECRET;
// const expiry = JWT_EXPIRES_IN;

// function signToken(payload) {
//     return jwt.sign(payload, jwtSecret, { expiresIn: expiry });
// }

// // verifyToken, function to verify jsonwebtoken

// function verifyToken(req) {

//     console.log(token);
//     return new Promise((resolve, reject) => {
//         jwt.verify(token, jwtSecret, (err, decoded) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(decoded);
//         });
//     });
// }

// module.exports = {
//     signToken,
//     verifyToken,
// };

const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config");
const jwtSecret = JWT_SECRET;
const expiry = JWT_EXPIRES_IN;

function signToken(payload) {
    return jwt.sign(payload, jwtSecret, { expiresIn: expiry });
}

function verifyToken(req, res, next) {
    // const token = req.headers["authorization"];

    const header = req.headers["authorization"];
    if (typeof header !== "undefined") {
        const bearer = header.split(" ");
        const token = bearer[1];
        try {
            jwt.verify(token, jwtSecret);
            req.user = jwt.verify(token, jwtSecret);
            // console.log(req.user);
            next();
        } catch (e) {
            res.status(400).json("Token not valid");
        }
    } else {
        res.sendStatus(403);
    }
}

module.exports = {
    signToken,
    verifyToken,
};
