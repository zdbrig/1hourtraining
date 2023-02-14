const amqp = require('amqplib');

const queueName = 'SqoinQueue';

(async function main() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName);
    console.log(`Worker connected to ${queueName} queue`);

    channel.consume(queueName, (msg) => {
      if (msg !== null) {
        const content = msg.content.toString();
        console.log(`Worker received message: ${content}`);
        // Do something with the message
        channel.ack(msg);
      }
    });
  } catch (err) {
    console.error(err);
  }
})();
