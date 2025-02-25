
import amqp from "amqplib";
import { config } from "../config/envConfig";
import { RabbitMQConnection, Message } from "../utils/types";

export const connectToRabbitMQ = async (): Promise<RabbitMQConnection> => {
  const { RABBITMQ_URL, EXCHANGE_NAME } = config;
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertExchange(EXCHANGE_NAME, "direct");

  const q = await channel.assertQueue("EXCHANGE_NAME");
  await channel.bindQueue(q.queue, EXCHANGE_NAME, Message.CREATE_ORDER);
  await channel.bindQueue(q.queue, EXCHANGE_NAME, Message.UPDATE_ORDER_STATUS);

  return { connection, channel, queue: q };
};
