const { getUserProfileService } = require('../services/userService');

exports.getUserProfile = async (req, res) => {
    try {
        const response = await getUserProfileService(req.user.id);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
