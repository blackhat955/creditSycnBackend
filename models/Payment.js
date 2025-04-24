import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cards: [
    {
      cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
      amountPaid: Number
    }
  ],
  totalAmount: Number,
  method: String,
  transactionId: String,
  receiptId: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Payment', paymentSchema);