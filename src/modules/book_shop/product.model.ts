import { model, Schema } from "mongoose";
import TProduct from "./product.interface";

const productSchema = new Schema<TProduct>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be a positive number"],
    },
    category: {
      type: String,
      required: true,
      enum: ["Fiction", "Science", "SelfDevelopment", "Poetry", "Religious"],
    },
    description: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);
const Product = model<TProduct>("product", productSchema);

export default Product;
