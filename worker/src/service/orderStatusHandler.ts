import { updateOrderStatusRequest } from "./updateStatus";
import { logOrderStatus } from "./logger";
import { Status } from '../utils/types';

// Mock a state handler
export const handleOrderStatus = async (payload: any) => {
  if (payload.status === Status.PENDING) {
    await logOrderStatus(payload.orderId, Status.PENDING);
    await updateOrderStatusRequest({ ...payload, status: Status.PROCESSING });
  }

  // fake FAILED orders
  if (payload.status === Status.PROCESSING) {
    const STATUS = Math.random() < 0.3 ? Status.FAILED : Status.COMPLETED;
    await logOrderStatus(payload.orderId, Status.PROCESSING);
    await updateOrderStatusRequest({ ...payload, status: STATUS });
  }

  if (payload.status === Status.COMPLETED || payload.status === Status.FAILED) {
    await logOrderStatus(payload.orderId, payload.status);
  }
};