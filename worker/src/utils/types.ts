import { Connection, Channel, Replies } from "amqplib";

export type RabbitMQConnection = {
  connection: Connection;
  channel: Channel;
  queue: Replies.AssertQueue;
}

export enum Status {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED"
}

export enum Message {
  CREATE_ORDER = "create_order",
  UPDATE_ORDER_STATUS = "update_order_status",
}