const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const saltRounds = 10;

const signupService = async ({ username, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return { message: "User registered successfully" };
};

const loginService = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return { token, user };
};

const logoutService = async () => {
    return { message: "Logged out successfully" };
};

module.exports = { signupService, loginService, logoutService };
