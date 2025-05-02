const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction');
const { protect } = require('../middlewares/protect');

router.post('/send', protect, transactionController.sendMoney);
// router.get('/transactions', protect, transactionController.getTransactions);
// router.get('/transactions/:id', protect, transactionController.getTransactionById);
module.exports = router;
