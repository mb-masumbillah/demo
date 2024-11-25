import express, { Application, Request, Response } from "express";
import cors from "cors";
import { prductRouter } from "./modules/book_shop/product.route";
import errorHandler from "./utils/genericErrorHandle";
import { prductOrderRouter } from "./modules/book_shop_order/order.route";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// route
app.use("/api/products", prductRouter);
app.use("/api/orders", prductOrderRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("book shop server is runing");
});

// Error
app.use(errorHandler);

export default app;
