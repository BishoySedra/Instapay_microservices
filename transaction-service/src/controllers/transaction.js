const { publishEvent } = require('../utils/publisher');
const transactionService = require('../services/transaction');

exports.sendMoney = async (req, res) => {
  const { senderId, receiverId, amount, description } = req.body;

  if (!senderId || !receiverId || !amount) {
    return res.status(400).json({ message: 'Missing required fields' });
  }


  try {
    // Step 1: Emit transfer.requested event
    publishEvent('transfer.requested', {
      senderId,
      receiverId,
      amount,
      description,
      requestId: new Date().getTime(), // optional tracking
    });

    // Step 2: Respond immediately or poll for result
    res.status(202).json({ message: 'Transfer request submitted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};  


    // publishTransaction({
    //     transactionId: txn._id,
    //     senderId,
    //     receiverId,
    //     amount,
    //     timestamp: txn.createdAt,
    //   });
      


exports.getTransactions = async (req, res) => {
  return await transactionService.getTransactionsByUserId(req.userId);
}

exports.getTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await transactionService.getTransactionById(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction found', data: transaction });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};