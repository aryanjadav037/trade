const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    stockSymbol: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    type: { type: String, enum: ["buy", "sell"], required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", transactionSchema);
