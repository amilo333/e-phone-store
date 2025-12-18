const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const { login, getUserList } = require("./controller/user");
const {
  getCategoryList,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("./controller/category");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const {
  getProductList,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
  bookProduct,
  getOrderList,
  updateOrderStatus,
} = require("./controller/product");
const { getBrandList } = require("./controller/brand");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/server.js"], // files containing annotations
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//--------------------------------------------------------------------------------------------------------
// User.controller
//--------------------------------------------------------------------------------------------------------
/**
 * @swagger
 * /api/login:
 *   post:
 *     tags: [Auth]
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "locnm@gmail.com"
 *               password:
 *                 type: string
 *                 example: "1411"
 *     responses:
 *       200:
 *         description: Successful login
 */
app.post("/api/login", (req, res) => login(req, res));
/**
 * @swagger
 * /api/get-user:
 *   get:
 *     tags: [Auth]
 *     summary: Get user list
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for filtering users
 *     responses:
 *       200:
 *         description: List of users
 */
app.get("/api/get-user", (req, res) => getUserList(req, res));

//--------------------------------------------------------------------------------------------------------
// brand.controller
//--------------------------------------------------------------------------------------------------------
/**
 * @swagger
 * /api/get-brands:
 *   get:
 *     tags: [Brand]
 *     summary: Get brand list
 *     responses:
 *       200:
 *         description: List of brands
 */
app.get("/api/get-brands", (req, res) => getBrandList(req, res));

//--------------------------------------------------------------------------------------------------------
// category.controller
//--------------------------------------------------------------------------------------------------------
/**
 * @swagger
 * /api/get-categories:
 *   get:
 *     tags: [Category]
 *     summary: Get category list
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for filtering users
 *     responses:
 *       200:
 *         description: List of categories
 */
app.get("/api/get-categories", (req, res) => getCategoryList(req, res));
/** * @swagger
 * /api/create-category:
 *   post:
 *     tags: [Category]
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Category"
 *     responses:
 *       200:
 *         description: Category created successfully
 */
app.post("/api/create-category", (req, res) => createCategory(req, res));
/** * @swagger
 * /api/update-category/{id}:
 *   put:
 *     tags: [Category]
 *     summary: Update an existing category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Category"
 *     responses:
 *       200:
 *         description: Category created successfully
 */
app.put("/api/update-category/:id", (req, res) => updateCategory(req, res));
/**
 * @swagger
 * /api/delete-category/{id}:
 *   delete:
 *     tags: [Category]
 *     summary: Delete a category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 */
app.delete("/api/delete-category/:id", (req, res) => deleteCategory(req, res));

//--------------------------------------------------------------------------------------------------------
// product.controller
//--------------------------------------------------------------------------------------------------------
/**
 * @swagger
 * /api/get-products:
 *   get:
 *    tags: [Product]
 *    summary: Get product list
 *    parameters:
 *      - in: query
 *        name: search
 *        schema:
 *          type: string
 *        description: Search term for filtering products
 *      - in: query
 *        name: filter
 *        schema:
 *          type: string
 *        description: Filter by category or brand
 *    responses:
 *      200:
 *        description: List of products
 */
app.get("/api/get-products", (req, res) => getProductList(req, res));
/**
 * @swagger
 * /api/get-product/{id}:
 *  get:
 *   tags: [Product]
 *   summary: Get product detail
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The product ID
 *   responses:
 *     200:
 *       description: Product detail
 *
 */
app.get("/api/get-product/:id", (req, res) => getProductDetail(req, res));
/**
 * @swagger
 * /api/create-product:
 *   post:
 *     tags: [Product]
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Product"
 *               description:
 *                 type: string
 *                 example: "Product description"
 *               images:
 *                 type: array
 *                 example: ["image1.jpg", "image2.jpg"]
 *               size:
 *                 type: string
 *                 example: "6.7 inches"
 *               screen_tech:
 *                 type: string
 *                 example: "OLED"
 *               camera:
 *                 type: string
 *                 example: "48MP Main, 12MP Ultra Wide, 12MP"
 *               chip:
 *                 type: string
 *                 example: "A17 Pro"
 *               ram:
 *                 type: string
 *                 example: "8GB"
 *               rom:
 *                 type: string
 *                 example: "256GB"
 *               battery:
 *                 type: string
 *                 example: "4000mAh"
 *               sim:
 *                 type: string
 *                 example: "Dual SIM"
 *               os:
 *                 type: string
 *                 example: "iOS 17"
 *               resolution:
 *                 type: string
 *                 example: "1080x2400 pixels"
 *               cpu:
 *                 type: string
 *                 example: "Snapdragon 888"
 *               compatibility:
 *                 type: string
 *                 example: "5G, 4G LTE"
 *               category_id:
 *                 type: string
 *                 example: "category-id"
 *               brand_id:
 *                 type: string
 *                 example: "brand-id"
 *               models:
 *                 type: array
 *                 example: [{ "color": "Black", "price": 999, "in_stock": 50 }]
 *     responses:
 *       200:
 *         description: Product created successfully
 */
app.post("/api/create-product", (req, res) => createProduct(req, res));
/**
 * @swagger
 * /api/update-product/{id}:
 *   put:
 *     tags: [Product]
 *     summary: Update a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Product"
 *               description:
 *                 type: string
 *                 example: "Product description"
 *               images:
 *                 type: array
 *                 example: ["image1.jpg", "image2.jpg"]
 *               size:
 *                 type: string
 *                 example: "6.7 inches"
 *               screen_tech:
 *                 type: string
 *                 example: "OLED"
 *               camera:
 *                 type: string
 *                 example: "48MP Main, 12MP Ultra Wide, 12MP"
 *               chip:
 *                 type: string
 *                 example: "A17 Pro"
 *               ram:
 *                 type: string
 *                 example: "8GB"
 *               rom:
 *                 type: string
 *                 example: "256GB"
 *               battery:
 *                 type: string
 *                 example: "4000mAh"
 *               sim:
 *                 type: string
 *                 example: "Dual SIM"
 *               os:
 *                 type: string
 *                 example: "iOS 17"
 *               resolution:
 *                 type: string
 *                 example: "1080x2400 pixels"
 *               cpu:
 *                 type: string
 *                 example: "Snapdragon 888"
 *               compatibility:
 *                 type: string
 *                 example: "5G, 4G LTE"
 *               category_id:
 *                 type: string
 *                 example: "category-id"
 *               brand_id:
 *                 type: string
 *                 example: "brand-id"
 *               models:
 *                 type: array
 *                 example: [{ "color": "Black", "price": 999, "in_stock": 50 }]
 *     responses:
 *       200:
 *         description: Product created successfully
 */
app.put("/api/update-product/:id", (req, res) => updateProduct(req, res));
/**
 * @swagger
 * /api/delete-product/{id}:
 *   delete:
 *     tags: [Product]
 *     summary: Delete a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
app.delete("/api/delete-product/:id", (req, res) => deleteProduct(req, res));
/**
 * @swagger
 * /api/get-orders:
 *   get:
 *     tags: [Order]
 *     summary: Get order list
 *     parameters:
 *        - in: query
 *          name: search
 *          schema:
 *            type: string
 *          description: Search term for filtering products
 *     responses:
 *       200:
 *         description: List of orders
 */
app.get("/api/get-orders", (req, res) => getOrderList(req, res));
/**
 * @swagger
 * /api/create-order:
 *   post:
 *     tags: [Order]
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               booker:
 *                 type: string
 *                 example: "John Doe"
 *               phone:
 *                 type: string
 *                 example: ""
 *               address:
 *                  type: string
 *                  example: "123 Main St, City, Country"
 *               payment:
 *                  type: string
 *                  example: "Credit Card"
 *               price:
 *                  type: number
 *                  example: 1999.99
 *               items:
 *                  type: array
 *                  example: [{ "product_id": "prod-123", "model": "Black", "quantity": 1 }]
 *     responses:
 *       200:
 *         description: Order created successfully
 */
app.post("/api/create-order", (req, res) => bookProduct(req, res));
/**
 * @swagger
 * /api/update-order/{id}:
 *   put:
 *     tags: [Order]
 *     summary: Update order status
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "Shipped"
 *     responses:
 *       200:
 *         description: Order status updated successfully
 */
app.put("/api/update-order/:id", (req, res) => updateOrderStatus(req, res));

app.listen(5000, () =>
  console.log("Mock API running at http://localhost:5000")
);
 