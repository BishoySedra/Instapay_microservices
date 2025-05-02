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
