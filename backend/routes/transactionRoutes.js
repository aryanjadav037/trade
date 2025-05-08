const express = require("express");
const { buyStock, sellStock } = require("../controllers/transactionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/buy", authMiddleware, buyStock);
router.post("/sell", authMiddleware, sellStock);

module.exports = router;
