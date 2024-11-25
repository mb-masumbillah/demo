import { NextFunction, Request, Response } from "express";
import { orderService } from "./order.service";
import TOrder from "./order.interface";

// This function handles product order creation
const productOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, product, quantity, totalPrice } = req.body;

    // Check if the product exists in the database
    const filterProduct = await orderService.productIntoDB(product);
    if (!filterProduct) {
      res.status(404).json({
        message: "Book not found",
        status: false,
      });
    } else if (filterProduct.quantity < quantity) {
      // If the requested quantity is greater than the available stock
      res.status(400).json({
        message: "Insufficient stock",
        status: false,
      });
    }

    const orderData: TOrder = { email, product, quantity, totalPrice };

    // Create a new order in the database
    const result = await orderService.productOrderIntoDB(orderData);

    if (filterProduct && result) {
      // Update the product stock after the order is placed
      const productUpdate = await orderService.productUpdateIntoDB(
        product,
        filterProduct,
        quantity,
      );

      if (productUpdate) {
        res.status(201).json({
          message: "Order created successfully",
          status: true,
          data: result,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

// This function calculates the total revenue from all orders
const orderRevenueCalculate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await orderService.orderRevenueCalIntoDB();
    res.status(201).json({
      message: "Revenue calculated successfully",
      status: true,
      data: result[0],
    });
  } catch (error) {
    next(error);
  }
};

export const orderController = {
  productOrder,
  orderRevenueCalculate,
};
