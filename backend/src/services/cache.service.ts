import redis from '../config/redis';

export const getCachedOrder = async (orderId: string) => {
  try {
    const cachedOrder = await redis.get(`order:${orderId}`);
    return cachedOrder ? JSON.parse(cachedOrder) : null;
  } catch (error) {
    console.error('Error getting cache:', error);
    return null;
  }
};

export const setCachedOrder = async (orderId: string, orderData: any) => {
  try {
    await redis.set(`order:${orderId}`, JSON.stringify(orderData), 'EX', 600);
  } catch (error) {
    console.error('Error setting cache:', error);
  }
};
