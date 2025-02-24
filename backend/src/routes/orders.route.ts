import Router from "express";
import { validateOrderInput, validateToken, validateOrderStatus } from '../middlewares';
import { createOrder, getOrderById, updateOrderStatus } from "../controllers/orders.controller";

const router = Router();

router.post("/", validateOrderInput, createOrder);
router.patch("/", validateToken, validateOrderStatus, updateOrderStatus);
router.get("/:orderId", getOrderById);

export default router;