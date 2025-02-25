import Order from "../models/order.model";
import { NewOrder } from "../types";

export const createOrder = async (
  {userId, products}:
  { userId: string, products: Pick<NewOrder, "products"> }
) => {
  try {
    const orderId = crypto.randomUUID();
    const newOrder = await Order.create({ orderId, userId, products });
    return newOrder;
  } catch (error) {
    console.error('Error creating the order in DB:', error);
    throw new Error('Failed to create order');
  }
};

export const getOrderById = async (orderId: string) => {
  try {
    const order = await Order.findOne({ orderId });
    return order;
  } catch (error) {
    console.error('Error retrieving order from DB:', error);
    throw new Error('Failed to retrieve order');
  }
};

export const updateOrder = async (
  {orderId, status}:
  {orderId: string, status: string}
) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      { status },
      { new: true }
    );

    if (!updatedOrder) throw new Error('Order not found');
    return updatedOrder;
  } catch (error) {
    console.error('Error updating order in DB:', error);
    throw new Error('Failed to update order');
  }
};
