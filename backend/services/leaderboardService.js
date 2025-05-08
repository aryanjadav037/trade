const User = require("../models/User");

const getLeaderboardService = async () => {
    const users = await User.find().sort({ balance: -1 }).limit(10).select("username balance");
    return users;
};

module.exports = { getLeaderboardService };
