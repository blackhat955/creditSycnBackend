import Payment from '../models/Payment.js';
import Card from '../models/Card.js';

const calculateDistribution = (amount, cards) => {
  const sorted = [...cards].sort((a, b) => b.totalDue - a.totalDue);
  const results = [];
  let remaining = amount;

  for (let card of sorted) {
    const pay = Math.min(card.minimumDue, remaining);
    results.push({ cardId: card._id, cardName: card.cardName, amount: pay });
    remaining -= pay;
  }

  for (let card of sorted) {
    const item = results.find(r => r.cardId.equals(card._id));
    const extraDue = card.totalDue - item.amount;
    const pay = Math.min(extraDue, remaining);
    item.amount += pay;
    remaining -= pay;
  }

  return results;
};

export const getDistribution = async (req, res) => {
  const { amount } = req.body;
  const userId = req.userId;

  try {
    const cards = await Card.find({ userId });
    const distribution = calculateDistribution(amount, cards);
    const total = distribution.reduce((sum, item) => sum + item.amount, 0);

    res.status(200).json({ distribution, total });
  } catch (error) {
    res.status(500).json({ message: 'Failed to calculate distribution' });
  }
};

export const confirmPayment = async (req, res) => {
  const { amount, method, distribution } = req.body;
  const userId = req.userId;

  try {
    const transactionId = `payment-${Date.now()}`;
    const receiptId = `RCPT-${Math.floor(Math.random() * 1000000)}`;

    const payment = await Payment.create({
      userId,
      cards: distribution.map(d => ({ cardId: d.cardId, amountPaid: d.amount })),
      totalAmount: amount,
      method,
      transactionId,
      receiptId
    });

    res.status(201).json({
      success: true,
      message: 'Payment processed',
      transactionId,
      receiptId
    });
  } catch (error) {
    res.status(500).json({ message: 'Payment failed' });
  }
};

export const getReceipt = async (req, res) => {
  const receiptId = req.params.receiptId;

  try {
    const receipt = await Payment.findOne({ receiptId }).populate('cards.cardId');
    if (!receipt) return res.status(404).json({ message: 'Receipt not found' });

    res.status(200).json(receipt);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch receipt' });
  }
};
