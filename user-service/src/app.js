const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const { connectRabbitMQ, listenToTransferRequests }  = require('./utils/publisher'); // Import RabbitMQ connection

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.get('/health', (req, res) => {
  res.status(200).send({
    status: 'success',
    message: 'User service is running',
    timestamp: new Date().toISOString()
  });
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
    console.log(process.env.MONGO_URI);
    console.log('helll 2')
    console.log('ELHAMDULLAHHH');
    await mongoose.connect(process.env.MONGO_URI, {
      // These options may not be needed with newer Mongoose versions but included for compatibility
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('User Service connected to MongoDB');
    await connectRabbitMQ();
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
