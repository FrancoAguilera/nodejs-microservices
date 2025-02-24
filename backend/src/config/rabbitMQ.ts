import amqp, { Connection, Channel } from 'amqplib';
import { config } from './envConfig';

export const createChannel = async (): Promise<{ connection: Connection; channel: Channel }> => {
  try {
    const { RABBITMQ_URL, EXCHANGE_NAME } = config;

    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(EXCHANGE_NAME, { durable: true });
    console.log(`Conected to RabbitMQ and '${EXCHANGE_NAME}' created`);
    return { connection, channel };
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    throw error;
  }
};