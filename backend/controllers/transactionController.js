const transactionService = require('../services/transactionService');
const stockService = require('../services/stockService');

exports.buyStock = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { symbol, quantity } = req.body;
    if (!symbol || !quantity) {
      return res.status(400).json({ error: 'Symbol and quantity are required' });
    }
    if (quantity <= 0) {
      return res.status(400).json({ error: 'Quantity must be greater than zero' });
    }
    const stock = await stockService.getStockData(symbol);
    const result = await transactionService.buyStock(userId, symbol, quantity);

    res.json({
      message: 'Stock purchased successfully',
      updatedBalance: result.updatedBalance
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.sellStock = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { symbol, quantity } = req.body;

    if (!symbol || !quantity) {
      return res.status(400).json({ error: 'Symbol and quantity are required' });
    }
    if (quantity <= 0) {
      return res.status(400).json({ error: 'Quantity must be greater than zero' });
    }

    const stock = await stockService.getStockData(symbol);
    const result = await transactionService.sellStock(userId, symbol, quantity);

    res.json({
      message: 'Stock sold successfully',
      updatedBalance: result.updatedBalance
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
