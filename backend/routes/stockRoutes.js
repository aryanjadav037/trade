const express = require("express");
const { getStockPrice } = require("../controllers/stockController");

const stockRouter = express.Router();
stockRouter.get("/:symbol", getStockPrice);

module.exports = stockRouter;
