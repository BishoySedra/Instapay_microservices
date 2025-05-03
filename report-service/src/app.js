const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const reportRouter = require('./routes/report');
const { connectRabbitMQ } = require('./utils/consumer');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/reports', reportRouter);
app.get('/', (req, res) => res.send('Reporting Service Running'));

const start = async () => {
  try {
    let MONGO_URI_REPORT, RabbitMQ_URI_REPORT;
    if (process.env.NODE_ENV === 'development') 
    {
      MONGO_URI_REPORT = process.env.MONGO_URI;
      RabbitMQ_URI_REPORT = process.env.RABBITMQ_URI;
    }
    else if (process.env.NODE_ENV === 'staging') 
    {
      MONGO_URI_REPORT = process.env.MONGO_URI;
      RabbitMQ_URI_REPORT = process.env.RABBITMQ_URI;
      MONGO_URI_REPORT = MONGO_URI_REPORT.replace('staging_user', process.env.MONGO_USER).replace('staging_pass', process.env.MONGO_PASS);
      RabbitMQ_URI_REPORT = RabbitMQ_URI_REPORT.replace('staging_user', process.env.RABBITMQ_USER).replace('staging_pass', process.env.RABBITMQ_PASS);
    }
    else if (process.env.NODE_ENV === 'production') 
    {
      MONGO_URI_REPORT = process.env.MONGO_URI;
      RabbitMQ_URI_REPORT = process.env.RABBITMQ_URI;
      MONGO_URI_REPORT = MONGO_URI_REPORT.replace('prod_user', process.env.MONGO_USER).replace('prod_pass', process.env.MONGO_PASS);
      RabbitMQ_URI_REPORT = RabbitMQ_URI_REPORT.replace('prod_user', process.env.RABBITMQ_USER).replace('prod_pass', process.env.RABBITMQ_PASS);
    }
    await mongoose.connect(process.env.MONGO_URI);
    await connectRabbitMQ();

    const PORT = process.env.PORT || 3003;
    app.listen(PORT, () => console.log(`Reporting Service on ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
