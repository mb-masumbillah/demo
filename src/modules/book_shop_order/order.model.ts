import { model, Schema } from "mongoose";
import TOrder from "./order.interface";

const productOrderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      match: [/.+@.+\..+/, "Please provide a valid email address"],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product reference is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      min: [0, "Total price must be a positive number"],
    },
  },
  {
    timestamps: true,
  },
);
const Order = model<TOrder>("order", productOrderSchema);

export default Order;
