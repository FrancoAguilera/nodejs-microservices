import Router from "express";
import { validateOrderInput, validateToken, validateOrderStatus } from '../middlewares';
import { createOrderHandler, getOrderByIdHandler, updateOrderStatus } from "../controllers/orders.controller";

const router = Router();

router.post("/", validateOrderInput, createOrderHandler);
router.patch("/", validateToken, validateOrderStatus, updateOrderStatus);
router.get("/:orderId", getOrderByIdHandler);

export default router;