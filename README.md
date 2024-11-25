# **Book Shop B4A2V1**

An advanced RESTful API for managing an online bookstore, built with **Express.js**, **TypeScript**, and **MongoDB**. This API supports full CRUD operations for managing books and orders, with features like inventory management, revenue calculation, and advanced validation.

---

## **Live Demo**

- **API Base URL:** [https://book-shop-server-green.vercel.app/](https://book-shop-server-green.vercel.app/)  


---

## **Features**

### **Product Management**

- Create, read, update, and delete books.
- Search books by `title`, `author`, or `category`.
- Inventory management to track stock levels.

### **Order Management**

- Place orders for books with real-time stock updates.
- Automatically calculate total price for each order.
- Manage customer details and order quantities.

### **Revenue Tracking**

- Calculate total revenue from all orders using MongoDB aggregation.

### **Error Handling**

- Comprehensive error responses for validation, not found, and insufficient stock.
- Clear and structured error messages for debugging.

---

## **Technologies Used**

- **Backend Framework:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Programming Language:** TypeScript
- **Validation:** Mongoose Schema Validation
- **API Testing:** Postman
- **Deployment:** vercel 

---

## **Project Structure**

```
src/
├── controllers/       # Business logic for API endpoints
├── models/            # Mongoose schemas for Products and Orders
├── routes/            # API endpoint definitions
├── utils/             # Utility functions (e.g., error handling)
├── app.ts             # Main application setup
├── server.ts          # Server entry point
```

---


### **Installation**

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/mb-masumbillah/boo-shop-server.git
   cd boo-shop-server
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**  
   Create a `.env` file in the root directory and add the following:

   ```env
   NODE_ENV=development
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. **Run the Server:**
   ```bash
   npm run dev
   ```
   The server will start at `http://localhost:5000`.

---

## **API Endpoints**

### **Product Endpoints**

1. **Create a Book:**

   - **POST** `/api/products`
   - **Request Body:**
     ```json
     {
       "title": "The Great Gatsby",
       "author": "F. Scott Fitzgerald",
       "price": 10,
       "category": "Fiction",
       "description": "A story about the American dream.",
       "quantity": 100,
       "inStock": true
     }
     ```
   - **Response:** Details of the created book.

2. **Get All Books:**

   - **GET** `/api/products`
   - **Query Parameters:**
     - `searchTerm` (optional): Search by `title`, `author`, or `category`.
   - **Response:** List of books.

3. **Get a Specific Book:**

   - **GET** `/api/products/:productId`
   - **Response:** Details of the specific book.

4. **Update a Book:**

   - **PUT** `/api/products/:productId`
   - **Request Body:** Partial updates (e.g., `price`, `quantity`).
   - **Response:** Updated book details.

5. **Delete a Book:**
   - **DELETE** `/api/products/:productId`
   - **Response:** Confirmation message.

---

### **Order Endpoints**

1. **Place an Order:**

   - **POST** `/api/orders`
   - **Request Body:**
     ```json
     {
       "email": "customer@example.com",
       "product": "648a45e5f0123c45678d9012",
       "quantity": 2,
       "totalPrice": 20
     }
     ```
   - **Response:** Details of the created order.

2. **Calculate Revenue:**
   - **GET** `/api/orders/revenue`
   - **Response:**
     ```json
     {
       "totalRevenue": 450
     }
     ```

---

## **Error Handling**

- **Validation Errors:**  
  Returns clear error messages when input validation fails.  
  Example:

  ```json
  {
    "message": "Validation failed",
    "success": false,
    "error": {
      "price": "Price must be a positive number"
    }
  }
  ```

- **Not Found:**  
  Returns `404` if a product or order is not found.

- **Insufficient Stock:**  
  Returns an error if the requested quantity exceeds available stock.

---


