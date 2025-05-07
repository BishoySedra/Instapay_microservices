const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { connectRabbitMQ, listenToEvents } = require('./utils/publisher');
const dotenv = require('dotenv');
const transactionRouter = require('./routes/transaction');

// dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
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

    let MONGO_URI_TRANSACTION, RabbitMQ_URI_TRANSACTION;
    if (process.env.NODE_ENV === 'development') 
    {
      MONGO_URI_TRANSACTION = process.env.MONGO_URI;
      RabbitMQ_URI_TRANSACTION = process.env.RABBITMQ_URL;
    }
    else if (process.env.NODE_ENV === 'staging') 
    {
      MONGO_URI_TRANSACTION = process.env.MONGO_URI;
      RabbitMQ_URI_TRANSACTION = process.env.RABBITMQ_URL;
      MONGO_URI_TRANSACTION = MONGO_URI_TRANSACTION.replace('staging_user', process.env.MONGO_USER).replace('staging_pass', process.env.MONGO_PASS);
      RabbitMQ_URI_TRANSACTION = RabbitMQ_URI_TRANSACTION.replace('staging_user', process.env.RABBITMQ_USER).replace('staging_pass', process.env.RABBITMQ_PASS);
    }
    else if (process.env.NODE_ENV === 'production') 
    {
      console.log(process.env.MONGO_URI)
      console.log(process.env.RABBITMQ_URL)
      MONGO_URI_TRANSACTION = process.env.MONGO_URI;
      RabbitMQ_URI_TRANSACTION = process.env.RABBITMQ_URL;
      MONGO_URI_TRANSACTION = MONGO_URI_TRANSACTION.replace('prod_user', process.env.MONGO_USER).replace('prod_pass', process.env.MONGO_PASS);
      RabbitMQ_URI_TRANSACTION = RabbitMQ_URI_TRANSACTION.replace('prod_user', process.env.RABBITMQ_USER || 'guest').replace('prod_pass', process.env.RABBITMQ_PASS || 'guest');
    }
    await mongoose.connect(process.env.MONGO_URI, {
      // These options may not be needed with newer Mongoose versions but included for compatibility
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    await connectRabbitMQ(RabbitMQ_URI_TRANSACTION);
    await listenToEvents();
    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => console.log(`Transaction Service running on port ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
