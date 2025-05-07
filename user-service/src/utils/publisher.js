const amqp = require('amqplib');
const User = require('../models/User');

let channel;

const connectRabbitMQ = async (url) => {
    try {
      console.log(process.env.RABBITMQ_URL)
      const connection = await amqp.connect(url);
      channel = await connection.createChannel();
      await channel.assertExchange('transactions_exchange', 'fanout', { durable: true });
      // await channel.assertQueue('users', { durable: true });
      console.log('Connected to RabbitMQ - Transaction Service');
    } catch (err) {
      console.log(`⏳ RabbitMQ connection failed : ${err.message}`);
    }
};

const publishEvent = (eventName, data) => {
  if (!channel) return console.error("RabbitMQ not initialized");
  const event = { event: eventName, data, timestamp: new Date().toISOString(), };
  channel.publish('transactions_exchange', '', Buffer.from(JSON.stringify(event)), {
    persistent: true,
  });
  
};

const listenToTransferRequests = async () => {
  const q = await channel.assertQueue('', { exclusive: true });
  await channel.bindQueue(q.queue, 'transactions_exchange', '');

  channel.consume(q.queue, async (msg) => {
    if (!msg) return;

    const event = JSON.parse(msg.content.toString());
    console.log('Received Transaction:', event);

    if (event.event === 'transfer.requested') {
      const { senderId, receiverEmail, amount, description } = event.data;
      console.log('received transfer.requested', event.data);
      try {
        const sender = await User.findById(senderId);
        const receiver = await User.find({ email: receiverEmail });
        console.log('send receive');
        if (!sender || !receiver) throw new Error('User not found');
        if (sender.balance < amount) throw new Error('Insufficient balance');

        sender.balance -= amount;
        receiver.balance += amount;

        await sender.save();
        await receiver.save();
        console.log('trans done');
        publishEvent('transfer.completed', { senderId, receiverId: receiver._id, amount, description });
        console.log('transfer.completed sent');
      } catch (err) {
        publishEvent('transfer.failed', {
          senderId,
          receiverId: receiver._id,
          amount,
          reason: err.message,
        });
      }

      channel.ack(msg);
    }
  });
};

module.exports = { connectRabbitMQ, publishEvent, listenToTransferRequests };
