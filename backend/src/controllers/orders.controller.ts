import { Request, Response } from "express";
import Order from "../models/order.model";
import redis from '../config/redis';
import { publishMessage } from "../utils/sender"
import { Message } from "../utils/types"

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, products } = req.body;
    const orderId = crypto.randomUUID();

    const newOrder = await Order.create({ orderId, userId, products });

    await publishMessage(Message.CREATE_ORDER, {
      orderId: newOrder.orderId,
      status: newOrder.status
    });

    return res.status(201).json({
      orderId: newOrder.orderId,
      status: newOrder.status,
    });
  } catch (error) {
    console.error('Error creating the order:', error);
    return res.status(500).json({ error });
  }
}

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const cachedOrder = await redis.get(`order:${orderId}`);
    if (cachedOrder) {
      return res.json(JSON.parse(cachedOrder)).end(); // On cache response
    }

    const order = await Order.findOne({orderId}); // response from MongoDB
    if (!order) {
      return res.status(404).json({ error: 'Order not found' }).end();
    }

    await redis.set(`order:${orderId}`, JSON.stringify(order), 'EX', 3600); // update on redis
    return res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving the orders' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status, orderId } = req.body;
    const updatedOrder = await Order.findOneAndUpdate({ orderId }, { status },{ new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await publishMessage(Message.UPDATE_ORDER_STATUS, { orderId, status });

    return res.status(200).json({
      message: 'Order update success',
      orderId: updatedOrder.orderId,
      status: updatedOrder.status
    });
  } catch (error) {
    console.error('Error updating order state:', error);
    return res.status(500).json({ error: 'Error updating order state' });
  }
};