import mongoose from "mongoose";

type TOrder = {
  email: string;
  product: mongoose.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  createdAt?: string;
  updatedAt?: string;
};

export default TOrder;
