const express = require('express');
const dotenv = require('dotenv');
const notificationRouter = require('./routes/notification');
const mongoose = require('mongoose');
const { connectRabbitMQ } = require('./utils/consumer');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/notifications', notificationRouter);
app.get('/', (req, res) => res.send('Notification Service Running'));

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
          // These options may not be needed with newer Mongoose versions but included for compatibility
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
        });
    await connectRabbitMQ();

    const PORT = process.env.PORT || 3004;
    app.listen(PORT, () => console.log(`Notification Service on ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
