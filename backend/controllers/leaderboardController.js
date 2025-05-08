const { getLeaderboardService } = require('../services/leaderboardService');

exports.getLeaderboard = async (req, res) => {
    try {
        const response = await getLeaderboardService();
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
