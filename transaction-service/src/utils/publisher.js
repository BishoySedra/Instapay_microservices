const amqp = require('amqplib');
const transactionService = require('../services/transaction');
let channel;

const connectRabbitMQ = async () => {
  console.log(process.env.RABBITMQ_URL)
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();
  console.log('channel created')
  await channel.assertExchange('transactions_exchange', 'fanout', { durable: true });
  console.log('Connected to RabbitMQ - Transaction Service');
};

const publishEvent = (eventName, data) => {
  if (!channel) return console.error("RabbitMQ not initialized");
  const event = {
    event: eventName,
    data,
    timestamp: new Date().toISOString(),
  }

  channel.publish('transactions_exchange', '', Buffer.from(JSON.stringify(event)), {
    persistent: true,
  });
};

const listenToEvents = async () => {
  const q = await channel.assertQueue('', { exclusive: true });
  await channel.bindQueue(q.queue, 'transactions_exchange', '');

  channel.consume(q.queue, async (msg) => {
    if (!msg) return;

    const event = JSON.parse(msg.content.toString());
    console.log('Received Transaction:', event);

    if (event.event === 'transfer.completed') {
      const { senderId, receiverId, amount, description } = event.data;
      console.log('completed hereeeee');
      const txn = await transactionService.createTransaction({ senderId, receiverId, amount, description });

      publishEvent('transfer.success', {
        transactionId: txn._id,
        senderId,
        receiverId,
        amount,
        description,
        timestamp: txn.createdAt,
      });
      console.log('ba3atna success');
    }

    if (event.event === 'transfer.failed') {
      console.log('Transaction failed:', event.data.reason);
      // Optionally notify client via WebSocket, email, etc.
    }

    channel.ack(msg);
  });
};



module.exports = { connectRabbitMQ, publishEvent, listenToEvents };
