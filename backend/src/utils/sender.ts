import { config } from "../config/envConfig";
import amqp, { Channel } from "amqplib";
import { MessagePayload } from "../types"

let channel: Channel;

async function createChannel(): Promise<Channel> {
  const { RABBITMQ_URL } = config;

  if (!channel) {
    const connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
  }
  return channel;
}

export async function publishMessage(routingKey: string, payload: MessagePayload): Promise<void> {
  const { EXCHANGE_NAME } = config;
  const channel = await createChannel();

  await channel.assertExchange(EXCHANGE_NAME, "direct");

  const logDetails = {
    logType: routingKey,
    payload: payload,
    dateTime: new Date(),
  };

  channel.publish(EXCHANGE_NAME, routingKey, Buffer.from(JSON.stringify(logDetails)));
  console.log(`The new ${routingKey} log is sent to exchange ${EXCHANGE_NAME}`);
}