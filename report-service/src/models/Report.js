const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  transactionsSent: { type: Number, default: 0 },
  transactionsReceived: { type: Number, default: 0 },
  totalSentAmount: { type: Number, default: 0 },
  totalReceivedAmount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
