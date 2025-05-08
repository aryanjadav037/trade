const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
    stockSymbol: { type: String, required: true, unique: true },
    companyName: { type: String, required: false },
    latestPrice: { type: Number, required: true },
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Stock", stockSchema);
