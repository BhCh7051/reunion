const User = require("../models/user");
const jwt = require("../config/jwt");

async function authenticate(req, res) {
    const { email, password } = req.body;
    // Find the user with the matching email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({
            error: "Invalid email or password",
        });
    }

    // Compare the provided password with the hashed password in the database
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({
            error: "Invalid email or password",
        });
    }

    // Generate a JWT token for the user
    const token = jwt.signToken({
        user_id: user._id,
    });

    res.json({ token });
}

module.exports = {
    authenticate,
};
