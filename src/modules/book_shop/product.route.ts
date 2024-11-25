import express from "express";
import { productController as productController } from "./product.controller";

const router = express.Router();

router.post("/", productController.createProduct);
router.get("/", productController.getProduct);
router.get("/:productId", productController.getSingleProduct);
router.put("/:productId", productController.updateProduct);
router.delete("/:productId", productController.deleteProduct);

export const prductRouter = router;
