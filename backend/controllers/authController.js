const { signupService, loginService, logoutService } = require('../services/authService');

exports.signup = async (req, res) => {
    try {
        const response = await signupService(req.body);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message || "Server error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { token, user } = await loginService(req.body);

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.json({ message: "Login successful", userId: user._id });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        await logoutService(); 
        res.clearCookie("access_token");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message || "Server error" });
    }
};
