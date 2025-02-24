import amqp from "amqplib";
import { updateOrderStatusRequest } from "./service/updateStatus";
import { logOrderStatus } from "./service/logger";
import { config } from "./config/envConfig";
import { Message, Status } from './utils/types'

async function consumeMessages(): Promise<void> {
  const { RABBITMQ_URL, EXCHANGE_NAME } = config;
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();

  await channel.assertExchange(EXCHANGE_NAME, "direct");

  const q = await channel.assertQueue("EXCHANGE_NAME");

  await channel.bindQueue(q.queue, EXCHANGE_NAME, Message.CREATE_ORDER);
  await channel.bindQueue(q.queue, EXCHANGE_NAME, Message.UPDATE_ORDER_STATUS);

  console.log("Worker up and running");

  channel.consume(q.queue, async (msg) => {
    if (msg) {
      const { payload } = JSON.parse(msg.content.toString());

      // NOTE: here I mock the posible changes on the status of the order
      if (payload.status === Status.PENDING) {
        await logOrderStatus(payload.orderId, Status.PENDING);
        await updateOrderStatusRequest({ ...payload, status: Status.PROCESSING })
      }

      if (payload.status === Status.PROCESSING) {
        // fake possible failures
        const STATUS = Math.random() < 0.5 ? Status.FAILED : Status.COMPLETED;

        await logOrderStatus(payload.orderId, Status.PROCESSING);
        await updateOrderStatusRequest({ ...payload, status: STATUS })
      }

      if (payload.status === Status.COMPLETED || payload.status === Status.FAILED) {
        await logOrderStatus(payload.orderId, payload.status);
      }

      channel.ack(msg);
    }
  });
}

consumeMessages();
