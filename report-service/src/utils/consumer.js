const amqp = require('amqplib');
const Report = require('../models/Report');

const connectRabbitMQ = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertExchange('transactions_exchange', 'fanout', { durable: true });
  console.log('Connected to RabbitMQ - Reporting Service');
  const q = await channel.assertQueue('', { exclusive: true });
  await channel.bindQueue(q.queue, 'transactions_exchange', '');

  channel.consume(q.queue, async (msg) => {
    if (msg !== null) {
      const event = JSON.parse(msg.content.toString());
      console.log('Received Transaction:', event);

      if (event.event === 'transfer.success') {
        const { senderId, receiverId, amount } = event.data;
        console.log('gonna make one')
        // Update sender's report
        await Report.findOneAndUpdate(
          { userId: senderId },
          {
            $inc: {
              transactionsSent: 1,
              totalSentAmount: amount,
            },
          },
          { upsert: true }
        );
        
        console.log('made first')
        // Update receiver's report
        await Report.findOneAndUpdate(
          { userId: receiverId },
          {
            $inc: {
              transactionsReceived: 1,
              totalReceivedAmount: amount,
            },
          },
          { upsert: true }
        );
        console.log('made second')
        channel.ack(msg); // Acknowledge message after processing
      }
    }
  });
};

module.exports = { connectRabbitMQ };
