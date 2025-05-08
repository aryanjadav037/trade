const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 10000 },
    portfolio: [
        {
            stockSymbol: { type: String, required: true },
            quantity: { type: Number, required: true },
            avgPrice: { type: Number, required: true }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
