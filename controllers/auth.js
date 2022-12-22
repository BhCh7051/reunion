const User = require("../models/user");
const jwt = require("../config/jwt");

async function authenticate(req, res) {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({
            error: "Email is required",
        });
    }
    // Find the user with the matching email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({
            error: "Incorrect email",
        });
    }

    // Compare the provided password with the hashed password in the database

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({
            error: "Incorrect password",
        });
    }

    // Generate a JWT token for the user
    const token = jwt.signToken({
        user_id: user._id,
    });

    res.json({ token: token });
}

module.exports = {
    authenticate,
};
