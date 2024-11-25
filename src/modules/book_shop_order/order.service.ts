import TProduct from "../book_shop/product.interface";
import Product from "../book_shop/product.model";
import TOrder from "./order.interface";
import Order from "./order.model";

// This function fetches a product by its ID from the database
const productIntoDB = async (productId: string) => {
  const product = await Product.findById(productId);
  return product;
};

// This function creates a new order in the database
const productOrderIntoDB = async (orderData: TOrder) => {
  const order = await Order.create(orderData);
  return order;
};

// This function updates the product's quantity and stock status after an order
const productUpdateIntoDB = async (
  productId: string,
  updatedDoc: TProduct,
  quantity: any,
) => {
  // Calculate the new quantity after the order
  const updateQuantity = updatedDoc?.quantity - quantity;

  // Update the product in the database with the new quantity and stock status
  const order = await Product.findByIdAndUpdate(
    { _id: productId },
    {
      quantity: updateQuantity,
      updatedAt: Date.now(),
      inStock: updateQuantity > 0,
    },
    { new: true },
  );
  return order;
};

// This function calculates the total revenue from all orders in the database
const orderRevenueCalIntoDB = async () => {
  const result: any = Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalPrice" },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);
  return result;
};

export const orderService = {
  productIntoDB,
  productOrderIntoDB,
  productUpdateIntoDB,
  orderRevenueCalIntoDB,
};
