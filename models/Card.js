import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bankName: String,
  cardName: String,
  cardNumber: String,
  totalDue: Number,
  minimumDue: Number,
  interestRate: Number
});

export default mongoose.model('Card', cardSchema);