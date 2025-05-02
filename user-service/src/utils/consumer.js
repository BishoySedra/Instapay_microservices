// const amqp = require('amqplib');
// const User = require('../models/UserNotification');

// const connectRabbitMQ = async () => {
//   const connection = await amqp.connect(process.env.RABBITMQ_URL);
//   const channel = await connection.createChannel();
//   await channel.assertQueue('users');
//   console.log('Connected to RabbitMQ - Notification Service');

//   channel.consume(q.queue, async (msg) => {
//     if (msg !== null) {
//       const event = JSON.parse(msg.content.toString());
//       if (event.event === 'transaction.requested') {
//         const { senderId, receiverId, description, amount } = event.data;
//         try {
//           const sender = await User.findById(senderId);
//           const receiver = await User.findById(receiverId);
    
//           if (!sender || !receiver) throw new Error('User not found');
//           if (sender.balance < amount) throw new Error('Insufficient balance');
    
//           sender.balance -= amount;
//           receiver.balance += amount;
    
//           await sender.save();
//           await receiver.save();
    
//           // Emit success
//           publishEvent('transfer.completed', {
//             senderId,
//             receiverId,
//             amount,
//             description,
//           });
//         } catch (error) {
//           // Emit failure
//           publishEvent('transfer.failed', {
//             senderId,
//             receiverId,
//             amount,
//             description,
//             error: error.message,
//           });
//         }
//       channel.ack(msg); // Acknowledge after processing
//     }
//   }
// });
// };

// module.exports = { connectRabbitMQ };