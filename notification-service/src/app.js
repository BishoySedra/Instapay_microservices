const express = require('express');
// const dotenv = require('dotenv');
const cors = require('cors');
const notificationRouter = require('./routes/notification');
const mongoose = require('mongoose');
const { connectRabbitMQ } = require('./utils/consumer');

// dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/notifications', notificationRouter);
app.get('/', (req, res) => res.send('Notification Service Running'));

const start = async () => {
  try {
    let MONGO_URI_NOTIFICATION, RabbitMQ_URI_NOTIFICATION;
    if (process.env.NODE_ENV === 'development') 
    {
      MONGO_URI_NOTIFICATION = process.env.MONGO_URI;
      RabbitMQ_URI_NOTIFICATION = process.env.RABBITMQ_URL;
    }
    else if (process.env.NODE_ENV === 'staging') 
    {
      MONGO_URI_NOTIFICATION = process.env.MONGO_URI;
      RabbitMQ_URI_NOTIFICATION = process.env.RABBITMQ_URL;
      MONGO_URI_NOTIFICATION = MONGO_URI_NOTIFICATION.replace('staging_user', process.env.MONGO_USER).replace('staging_pass', process.env.MONGO_PASS);
      RabbitMQ_URI_NOTIFICATION = RabbitMQ_URI_NOTIFICATION.replace('staging_user', process.env.RABBITMQ_USER || 'guest').replace('staging_pass', process.env.RABBITMQ_PASS || 'guest');
    }
    else if (process.env.NODE_ENV === 'production') 
    {
      MONGO_URI_NOTIFICATION = process.env.MONGO_URI;
      RabbitMQ_URI_NOTIFICATION = process.env.RABBITMQ_URL;
      MONGO_URI_NOTIFICATION = MONGO_URI_NOTIFICATION.replace('prod_user', process.env.MONGO_USER).replace('prod_pass', process.env.MONGO_PASS);
      RabbitMQ_URI_NOTIFICATION = RabbitMQ_URI_NOTIFICATION.replace('prod_user', process.env.RABBITMQ_USER || 'guest').replace('prod_pass', process.env.RABBITMQ_PASS || 'guest');
    }
    await mongoose.connect(process.env.MONGO_URI, {
          // These options may not be needed with newer Mongoose versions but included for compatibility
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
        });
    await connectRabbitMQ(RabbitMQ_URI_NOTIFICATION);

    const PORT = process.env.PORT || 3004;
    app.listen(PORT, () => console.log(`Notification Service on ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
