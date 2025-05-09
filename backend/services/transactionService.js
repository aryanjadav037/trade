const User = require('../models/User');
const Stock = require('../models/Stock');
const Transaction = require('../models/Transaction');

class TransactionService {
  async buyStock(userId, symbol, quantity) {
    const user = await User.findById(userId);
    const stock = await Stock.findOne({ stockSymbol: symbol });
    if (!stock) throw new Error('Stock not found');

    const currentPrice = stock.latestPrice;
    const totalCost = currentPrice * quantity;

    if (user.balance < totalCost) throw new Error('Insufficient balance');

    user.balance -= totalCost;

    const existingStock = user.portfolio.find(p => p.stockSymbol === symbol);
    if (existingStock) {
      existingStock.avgPrice = (
        (existingStock.avgPrice * existingStock.quantity + totalCost) /
        (existingStock.quantity + quantity)
      );
      existingStock.quantity += quantity;
    } else {
      user.portfolio.push({ stockSymbol: symbol, quantity, avgPrice: currentPrice });
    }

    await user.save();

    await Transaction.create({
      userId,
      stockSymbol: symbol,
      quantity,
      price: currentPrice,
      type: 'buy',
    });

    return { success: true, updatedBalance: user.balance };
  }

  async sellStock(userId, symbol, quantity) {
    const user = await User.findById(userId);
    const stock = await Stock.findOne({ stockSymbol: symbol });
    if (!stock) throw new Error('Stock not found');

    const currentPrice = stock.latestPrice;
    const existingStock = user.portfolio.find(p => p.stockSymbol === symbol);
    if (!existingStock || existingStock.quantity < quantity) {
      throw new Error('Not enough stock to sell');
    }

    const totalGain = currentPrice * quantity;
    existingStock.quantity -= quantity;
    user.balance += totalGain;

    if (existingStock.quantity === 0) {
      user.portfolio = user.portfolio.filter(p => p.stockSymbol !== symbol);
    }

    await user.save();

    await Transaction.create({
      userId,
      stockSymbol: symbol,
      quantity,
      price: currentPrice,
      type: 'sell',
    });

    return { success: true, updatedBalance: user.balance };
  }
}

module.exports = new TransactionService();
