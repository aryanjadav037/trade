const axios = require("axios");
const Stock = require("../models/Stock");
const redisClient = require("../config/redis");

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

const getStockData = async (symbol) => {
    const cacheKey = `stock_data_${symbol}`;
    const cachdata = await redisClient.get(cacheKey);

    if(cachdata){
        return JSON.parse(cachdata);
    }

    const response = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    console.log("response data===>",response.data);
    const stockData = response.data["Global Quote"];
    if (!stockData) {
        throw new Error("Stock data not found");
    }

    let stock = await Stock.findOneAndUpdate(
        { stockSymbol: symbol },
        { latestPrice: stockData["05. price"], lastUpdated: new Date() },
        { new: true, upsert: true }
    );

    await redisClient.setEx(cacheKey, 60, JSON.stringify(stock));

    return stock;
}

module.exports = { getStockData };