const amqp = require('amqplib');
const { createNotification } = require('../services/notification');

const connectRabbitMQ = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();
  console.log('Connected to RabbitMQ - Notification Service');
  await channel.assertExchange('transactions_exchange', 'fanout', { durable: true });
  console.log('Connected to RabbitMQ - Reporting Service');
  const q = await channel.assertQueue('', { exclusive: true });
  await channel.bindQueue(q.queue, 'transactions_exchange', '');

  channel.consume(q.queue, async (msg) => {
    if (!msg) return
      const event = JSON.parse(msg.content.toString());
      console.log('Received Transaction:', event);

      if (event.event === 'transfer.success') {
        console.log('wasalna henaaaa');
        const { transactionId, senderId, receiverId, amount, timestamp } = event.data;
        console.log('NotificationService: Received Transaction:', event.data);
        const message_1 = `You have sent $${amount} to ${receiverId} at ${timestamp}`;
        const message_2 = `You have received $${amount} from ${senderId} at ${timestamp}`;
        // Mock notification sending
        await createNotification({ userId: senderId, message: message_1, type: 'TRANSACTION' });
        await createNotification({ userId: receiverId, message: message_2, type: 'TRANSACTION' });
        channel.ack(msg); // Acknowledge after processing
      }

      if (event.event === 'transfer.failed') {
        const { senderId, receiverId, amount, reason } = event.data;
        console.log('NotificationService: Transfer failed:', reason);
        const message_1 = `Your transfer of $${amount} to ${receiverId} failed due to ${reason}`;
        const message_2 = `You have received a failed transfer of $${amount} from ${senderId} due to ${reason}`;
        // Mock notification sending
        await createNotification({ userId: senderId, message: message_1, type: 'TRANSACTION' });
        await createNotification({ userId: receiverId, message: message_2, type: 'TRANSACTION' });
        channel.ack(msg); // Acknowledge after processing
      }
    
  });
};

module.exports = { connectRabbitMQ };
