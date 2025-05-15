const express = require('express');
const mongoose = require('mongoose');
// const dotenv = require('dotenv').config();
const cors = require('cors');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const { connectRabbitMQ, listenToTransferRequests } = require('./utils/publisher'); // Import RabbitMQ connection

// dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.get('/', (req, res) => {
  res.send('User Service is running');
});

// app.use('/*', (req, res) => {  
//   console.log('wrong route')
//   res.send({
//     status: 'fail',
//     message: 'wrong route'
//   });
// });

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
    console.log('helll 1')
    console.log(process.env);
    console.log('helll 2')
    console.log(process.env.MONGO_URI);
    console.log(process.env.RABBITMQ_URL);
    let mongo_url, RabbitMQ_URI_USER;
    if (process.env.NODE_ENV === 'development') {
      mongo_url = process.env.MONGO_URI;
      RabbitMQ_URI_USER = process.env.RABBITMQ_URL;
    } else if (process.env.NODE_ENV === 'staging') {
      mongo_url = process.env.MONGO_URI;
      RabbitMQ_URI_USER = process.env.RABBITMQ_URL;
      mongo_url = mongo_url.replace('staging_user', process.env.MONGO_USER || '').replace('staging_pass', process.env.MONGO_PASS || '');
      RabbitMQ_URI_USER = RabbitMQ_URI_USER.replace('staging_user', process.env.RABBITMQ_USER || 'guest').replace('staging_pass', process.env.RABBITMQ_PASS || 'guest');
    } else if (process.env.NODE_ENV === 'production') {
      mongo_url = process.env.MONGO_URI;
      RabbitMQ_URI_USER = process.env.RABBITMQ_URL;
      console.log('we here ?');
      // mongo_url = mongo_url.replace('prod_user', process.env.MONGO_INITDB_ROOT_USERNAME || '').replace('prod_pass', process.env.MONGO_INITDB_ROOT_PASSWORD || '');
      RabbitMQ_URI_USER = RabbitMQ_URI_USER.replace('prod_user', process.env.RABBITMQ_USER || 'guest').replace('prod_pass', process.env.RABBITMQ_PASS || 'guest');
    }
    await mongoose.connect(mongo_url, {
      // These options may not be needed with newer Mongoose versions but included for compatibility
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('User Service connected to MongoDB');
    console.log(RabbitMQ_URI_USER);
    await connectRabbitMQ(RabbitMQ_URI_USER);
    await listenToTransferRequests();
    console.log('RabbitMQ connected and listening for transfer requests');

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
