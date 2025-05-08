const transactionService = require('../services/transactionService');

exports.buyStock = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { symbol, quantity } = req.body;

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

    const result = await transactionService.sellStock(userId, symbol, quantity);

    res.json({
      message: 'Stock sold successfully',
      updatedBalance: result.updatedBalance
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
