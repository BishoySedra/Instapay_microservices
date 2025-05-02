const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' },
  description: String,
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
