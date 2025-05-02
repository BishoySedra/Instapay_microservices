const express = require('express');
const mongoose = require('mongoose');
const { connectRabbitMQ, listenToEvents } = require('./utils/publisher');
const dotenv = require('dotenv');
const transactionRouter = require('./routes/transaction');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/transaction', transactionRouter);
app.get('healthcheck', (req, res) => {
  res.status(200).send({
    status: 'success',
    message: 'Transaction service is running',
    timestamp: new Date().toISOString()
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).send({
    status: 'error',
    message: err.message || 'Internal server error'
  });
});


// Connect to MongoDB
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // These options may not be needed with newer Mongoose versions but included for compatibility
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    await connectRabbitMQ();
    await listenToEvents();
    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => console.log(`Transaction Service running on port ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
