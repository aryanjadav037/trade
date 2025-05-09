const express = require("express");
const { getStockPrice } = require("../controllers/stockController");

const stockRouter = express.Router();
stockRouter.get("/", getStockPrice);

module.exports = stockRouter;
