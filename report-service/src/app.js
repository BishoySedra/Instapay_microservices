const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const dotenv = require('dotenv');
const reportRouter = require('./routes/report');
const { connectRabbitMQ } = require('./utils/consumer');

// dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/reports', reportRouter);
app.get('/', (req, res) => res.send('Reporting Service Running'));

const start = async () => {
  try {
    let MONGO_URI_REPORT, RabbitMQ_URI_REPORT;
    if (process.env.NODE_ENV === 'development') 
    {
      MONGO_URI_REPORT = process.env.MONGO_URI;
      RabbitMQ_URI_REPORT = process.env.RABBITMQ_URL;
    }
    else if (process.env.NODE_ENV === 'staging') 
    {
      MONGO_URI_REPORT = process.env.MONGO_URI;
      RabbitMQ_URI_REPORT = process.env.RABBITMQ_URL;
      MONGO_URI_REPORT = MONGO_URI_REPORT.replace('staging_user', process.env.MONGO_USER).replace('staging_pass', process.env.MONGO_PASS);
      RabbitMQ_URI_REPORT = RabbitMQ_URI_REPORT.replace('staging_user', process.env.RABBITMQ_USER || 'guest').replace('staging_pass', process.env.RABBITMQ_PASS || 'guest');
    }
    else if (process.env.NODE_ENV === 'production') 
    {
      MONGO_URI_REPORT = process.env.MONGO_URI;
      RabbitMQ_URI_REPORT = process.env.RABBITMQ_URL;
      MONGO_URI_REPORT = MONGO_URI_REPORT.replace('prod_user', process.env.MONGO_USER).replace('prod_pass', process.env.MONGO_PASS);
      RabbitMQ_URI_REPORT = RabbitMQ_URI_REPORT.replace('prod_user', process.env.RABBITMQ_USER || 'guest').replace('prod_pass', process.env.RABBITMQ_PASS || 'guest');
    }
    await mongoose.connect(process.env.MONGO_URI);
    await connectRabbitMQ(RabbitMQ_URI_REPORT);

    const PORT = process.env.PORT || 3003;
    app.listen(PORT, () => console.log(`Reporting Service on ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
