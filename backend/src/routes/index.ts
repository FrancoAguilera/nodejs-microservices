import Router from "express";
import orders from "./orders.route";
import logs from './logs.route'

const router = Router();

router.use("/orders", orders);
router.use("/logs", logs);

export default router;