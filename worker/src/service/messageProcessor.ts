import { handleOrderStatus } from './orderStatusHandler';
import { Channel, ConsumeMessage } from "amqplib";

export const processMessage = async (channel: Channel, msg: ConsumeMessage) => {
  const { payload } = JSON.parse(msg.content.toString());
  await handleOrderStatus(payload);
  channel.ack(msg);
};