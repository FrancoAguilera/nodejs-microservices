import Router from "express";
import { retrieveLogs } from "../controllers/logs.controller";

const router = Router();

router.get("/orders/:orderId", retrieveLogs);

export default router;