import express from "express";
import { orderController } from "./order.controller";

const router = express.Router();

router.put("/", orderController.productOrder);
router.get("/revenue", orderController.orderRevenueCalculate);

export const prductOrderRouter = router;
