const { getStockData } = require('../services/stockService');

exports.getStockPrice = async (req, res) => {
    try {
        const response = await getStockData(req.body.symbol);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: "Error fetching stock data" });
    }
};
