const Transaction = require('../models/Transaction');
exports.createTransaction = async (transactionData) => {
  const { senderId, receiverId, amount, description } = transactionData
  return await Transaction.create({ senderId, receiverId, amount, description });
}

exports.getTransactionsByUserId = async (id) => {
  try {
    // get transactions where senderId or receiverId is equal to id
    console.log('started finding')
    const transactions = await Transaction.find({ $or: [{ senderId: id }, { receiverId: id }] });
    console.log('ended finding');
    if (!transactions)
      throw new Error('No transactions found for this user');
    return transactions;
    } catch (err) {
      throw new Error('Error fetching transactions: ' + err.message);
    }
  }
exports.getTransactionById = async (id) => {
  try {
    // get transactions where senderId or receiverId is equal to id
    const transaction = await Transaction.findById(id);
    if (!transaction)
      throw new Error('No transactions found for this user');
    return transaction;
    } catch (err) {
      throw new Error('Error fetching transactions: ' + err.message);
    }
  }
