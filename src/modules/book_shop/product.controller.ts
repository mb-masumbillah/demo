import { NextFunction, Request, Response } from "express";
import { productService } from "./product.service";

// This function creates a new product (book) in the database
const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bookData = req.body;
    const result = await productService.createProductIntoDB(bookData);
    res.status(200).json({
      message: "Book created successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// This function retrieves all products based on a search term
const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.query?.searchTerm;
    const result = await productService.getProductIntoDB(query);
    res.status(200).json({
      message: "Books retrieved successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// This function retrieves a single product by its ID
const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const result = await productService.getSingleProductIntoDB(productId);
    res.status(200).json({
      message: "Book retrieved successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// This function updates an existing product by its ID
const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updateDoc = req.body;
    const { productId } = req.params;

    const result = await productService.updateProductIntoDB(
      productId,
      updateDoc,
    );
    res.status(200).json({
      message: "Book updated successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// This function deletes a product by its ID
const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const result = await productService.deleteProductIntoDB(productId);
    res.status(200).json({
      message: "Book deleted successfully",
      status: true,
      data: result || {},
    });
  } catch (error) {
    next(error);
  }
};

export const productController = {
  createProduct,
  getProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
