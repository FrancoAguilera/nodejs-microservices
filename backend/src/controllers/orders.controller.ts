import { Request, Response } from "express";
import { Message, Status } from "../utils/types"
import { getCachedOrder, setCachedOrder } from "../services/cache.service";
import { createOrder, updateOrder, getOrderById } from '../services/order.service';
import { publishMessage } from "../utils/sender"
import { MessagePayload } from "../types"

export const createOrderHandler = async (req: Request, res: Response) => {
  let newOrder: MessagePayload = { orderId: '', status: Status.FAILED};
  try {
    const { userId, products } = req.body;
    newOrder = await createOrder({ userId, products })
    return res.status(201).json({
      orderId: newOrder.orderId,
      status: newOrder.status,
    });
  } catch (error) {
    console.error('Error creating the order:', error);
    return res.status(500).json({ error });
  } finally {
    await publishMessage(
      Message.CREATE_ORDER,
      { orderId: newOrder.orderId, status: newOrder.status }
    );
  }
}

export const getOrderByIdHandler = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const cachedOrder = await getCachedOrder(orderId);
    if (cachedOrder) return res.json(cachedOrder).end();

    const order = await getOrderById(orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' }).end();

    await setCachedOrder(orderId, order);

    return res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving the orders' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  let updatedOrder: MessagePayload = { orderId: '', status: Status.FAILED};
  try {
    const { status, orderId } = req.body;
    updatedOrder = await updateOrder({orderId, status});

    return res.status(200).json({
      message: 'Order update success',
      orderId: updatedOrder.orderId,
      status: updatedOrder.status
    });
  } catch (error) {
    console.error('Error updating order state:', error);
    return res.status(500).json({ error: 'Error updating order state' });
  } finally {
    await publishMessage(
      Message.UPDATE_ORDER_STATUS,
      { orderId: updatedOrder.orderId, status: updatedOrder.status }
    );
  }
};