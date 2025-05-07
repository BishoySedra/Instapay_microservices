const { publishEvent } = require('../utils/publisher');
const transactionService = require('../services/transaction');

exports.sendMoney = async (req, res) => {
  const { receiverEmail, amount, description } = req.body;
  const senderId = req.userId; // Assuming senderId is the authenticated user's ID
  if (!senderId || !amount) {
    return res.status(400).json({ message: 'Missing required fields' });
  }


  try {
    // Step 1: Emit transfer.requested event
    publishEvent('transfer.requested', {
      senderId,
      receiverEmail,
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

exports.getTransactions = async (req, res) => {
  const data = await transactionService.getTransactionsByUserId(req.userId);
  res.status(200).json({ message: 'successful', data });
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