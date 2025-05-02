// const amqp = require('amqplib');
// const User = require('../models/UserNotification');

// const connectRabbitMQ = async () => {
//   const connection = await amqp.connect(process.env.RABBITMQ_URL);
//   const channel = await connection.createChannel();
//   await channel.assertExchange('transactions_exchange');
//   console.log('Connected to RabbitMQ - Notification Service');

//   channel.consume(q.queue, async (msg) => {
//     if (msg !== null) {
//       const event = JSON.parse(msg.content.toString());
//       if (event.event === 'transaction.completed') {
//         const { senderId, receiverId, amount, description } = event.data;

//     await transactionService.createTransaction({
//       senderId,
//       receiverId,
//       amount,
//       description,
//     });
//   }
//      channel.ack(msg); // Acknowledge after processing
//     }
//   });
// };

// module.exports = { connectRabbitMQ };