const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction');
const { protect } = require('../middlewares/protect');

router.post('/send', protect, transactionController.sendMoney);
router.get('/', protect, transactionController.getTransactions);
router.get('/:id', protect, transactionController.getTransactionById);
module.exports = router;
