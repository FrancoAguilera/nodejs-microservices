import { connectToRabbitMQ } from './service/rabbitMQConnection';
import { processMessage } from './service/messageProcessor';

async function startWorker() {
  const { channel, queue } = await connectToRabbitMQ();

  console.log("Worker up and running");

  channel.consume(queue.queue, async (msg) => {
    if (msg) {
      await processMessage(channel, msg);
    }
  });
}

startWorker();