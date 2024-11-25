import TProduct from "./product.interface";
import Product from "./product.model";

// This function creates a new product (book) in the database
const createProductIntoDB = async (bookData: TProduct) => {
  const result = await Product.create(bookData);
  return result;
};

// This function retrieves products based on a search term (title, author, or category)
const getProductIntoDB = async (searchTerm: any) => {
  const filter = searchTerm
    ? {
        $or: [
          { title: { $regex: searchTerm || "", $options: "i" } },
          { author: { $regex: searchTerm || "", $options: "i" } },
          { category: { $regex: searchTerm || "", $options: "i" } },
        ],
      }
    : {};

  const result = Product.find(filter);
  return result;
};

// This function retrieves a single product by its ID
const getSingleProductIntoDB = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  return result;
};

// This function updates a product by its ID with new data
const updateProductIntoDB = async (filter: string, updateDoc: TProduct) => {
  const result = Product.findByIdAndUpdate(
    { _id: filter },
    { ...updateDoc, updatedAt: Date.now(), inStock: updateDoc.quantity > 0 },
    { new: true },
  );
  return result;
};

// This function deletes a product by its ID
const deleteProductIntoDB = async (filter: string) => {
  const result = await Product.findByIdAndDelete(filter, { new: true });
  return result;
};

export const productService = {
  createProductIntoDB,
  getProductIntoDB,
  getSingleProductIntoDB,
  updateProductIntoDB,
  deleteProductIntoDB,
};
