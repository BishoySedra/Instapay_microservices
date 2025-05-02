const User = require('../models/User');

exports.transfer = async (req, res) => {
  const { senderId, receiverId, amount } = req.body;

  if (!senderId || !receiverId || !amount) {
    return res.status(400).json({ message: 'Missing transfer fields' });
  }

  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);
    console.log(sender);
    console.log(receiver);
    if (!sender || !receiver) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    res.status(200).json({ message: 'Transfer complete' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBalance = async (req, res) => {
  const { amount } = req.body;
  const id = req.userId;
  if (!amount) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const user = userService.getUserById(id);
    if (user.balance + amount < 0) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    user.balance += amount;
    await user.save();
    res.status(200).json({ message: 'Balance updated successfully', data: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}