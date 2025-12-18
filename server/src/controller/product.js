const path = require("path");
const { success, badRequest } = require("../util");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const PRODUCT_JSON = path.join(__dirname, "..", "data", "product.json");
const USER_JSON = path.join(__dirname, "..", "data", "user.json");
const BRAND_JSON = path.join(__dirname, "..", "data", "brand.json");
const CATEGORY_JSON = path.join(__dirname, "..", "data", "category.json");
const ORDER_JSON = path.join(__dirname, "..", "data", "order.json");

function productJson() {
  const txt = fs.readFileSync(PRODUCT_JSON, "utf8");
  return JSON.parse(txt);
}

function userJson() {
  const txt = fs.readFileSync(USER_JSON, "utf8");
  return JSON.parse(txt);
}

function brandJson() {
  const txt = fs.readFileSync(BRAND_JSON, "utf8");
  return JSON.parse(txt);
}

function categoryJson() {
  const txt = fs.readFileSync(CATEGORY_JSON, "utf8");
  return JSON.parse(txt);
}

function orderJson() {
  const txt = fs.readFileSync(ORDER_JSON, "utf8");
  return JSON.parse(txt);
}

function saveData(arr) {
  fs.writeFileSync(PRODUCT_JSON, JSON.stringify(arr, null, 2));
}

function saveOrder(arr) {
  fs.writeFileSync(ORDER_JSON, JSON.stringify(arr, null, 2));
}

module.exports = {
  getProductList: (req, res) => {
    const { search, filter } = req.query;
    let products = productJson();
    const brands = brandJson();

    if (search && String(search).trim().length > 0) {
      const q = String(search).trim().toLowerCase();
      products = products.filter((p) => {
        const name = p.name ? String(p.name).toLowerCase() : "";
        return name.includes(q);
      });
    }

    if (filter && String(filter).trim().length > 0) {
      const f = String(filter).trim().toLowerCase();
      products = products.filter((p) => {
        const category = p.category_id
          ? String(p.category_id).toLowerCase()
          : "";
        return category.includes(f);
      });
    }

    for (let productIdx = 0; productIdx < products.length; productIdx++) {
      const brand = brands.find(
        (item) => item.id === products[productIdx].brand_id
      );
      products[productIdx].brand = brand ? brand.name : null;
    }

    return success(res, products);
  },
  getProductDetail: (req, res) => {
    const { id } = req.params;
    const products = productJson();
    const product = products.find((p) => p.id === id);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    return success(res, product);
  },
  createProduct: (req, res) => {
    const {
      name,
      description,
      images,
      size,
      screen_tech,
      camera,
      chip,
      ram,
      rom,
      battery,
      sim,
      os,
      resolution,
      cpu,
      compatibility,
      brand_id,
      category_id,
      models,
    } = req.body;
    const products = productJson();
    const category = categoryJson();
    const brand = brandJson();

    if (
      !name ||
      !description ||
      !brand_id ||
      !category_id ||
      !images ||
      images?.length === 0 ||
      !models ||
      models?.length === 0
    ) {
      badRequest(res, "Các trường bắt buộc trống");
    }

    const existingCategory = category.find((c) => c.id === category_id);
    if (!existingCategory) {
      return res.status(400).json({ message: "Invalid category_id" });
    }

    const existingBrand = brand.find((b) => b.id === brand_id);
    if (!existingBrand) {
      return res.status(400).json({ message: "Invalid brand_id" });
    }

    const newProduct = {
      id: uuidv4(),
      name,
      description,
      images,
      size,
      screen_tech,
      camera,
      chip,
      ram,
      rom,
      battery,
      sim,
      os,
      resolution,
      cpu,
      compatibility,
      category_id,
      brand_id,
      created_at: new Date().toISOString(),
      models: models.map((model) => ({
        id: uuidv4(),
        ...model,
      })),
    };
    products.unshift(newProduct);
    saveData(products);
    return success(res, newProduct);
  },
  updateProduct: (req, res) => {
    const { id } = req.params;
    const {
      name,
      description,
      images,
      size,
      screen_tech,
      camera,
      chip,
      ram,
      rom,
      battery,
      sim,
      os,
      resolution,
      cpu,
      compatibility,
      brand_id,
      category_id,
      models,
    } = req.body;
    const products = productJson();
    const category = categoryJson();
    const brand = brandJson();

    const existingCategory = category.find((c) => c.id === category_id);
    if (!existingCategory) {
      return res.status(400).json({ message: "Invalid category_id" });
    }

    const existingBrand = brand.find((b) => b.id === brand_id);
    if (!existingBrand) {
      return res.status(400).json({ message: "Invalid brand_id" });
    }
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      return res.status(400).json({ message: "Product not found" });
    }
    products[productIndex] = {
      ...products[productIndex],
      name,
      description,
      images,
      size,
      screen_tech,
      camera,
      chip,
      ram,
      rom,
      battery,
      sim,
      os,
      resolution,
      cpu,
      compatibility,
      brand_id,
      category_id,
      models,
    };
    saveData(products);
    return success(res, products[productIndex], "Product updated successfully");
  },
  deleteProduct: (req, res) => {
    const { id } = req.params;
    const products = productJson();
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      return res.status(400).json({ message: "Product not found" });
    }
    products.splice(productIndex, 1);
    saveData(products);
    return success(res, null, "Product deleted successfully");
  },
  getOrderList: (req, res) => {
    const { search } = req.query;
    let orders = orderJson();

    if (search && String(search).trim().length > 0) {
      const q = String(search).trim().toLowerCase();
      orders = orders.filter((p) => {
        const id = p.id ? String(p.id).toLowerCase() : "";
        return id.includes(q);
      });
    }

    return success(res, orders);
  },
  bookProduct: (req, res) => {
    const { booker, phone, address, payment, price, items } = req.body;
    const orders = orderJson();

    if (!booker || !phone || !address || !payment || !items) {
      return badRequest(res, "Các trường bắt buộc trống");
    }

    const newOrder = {
      id: uuidv4(),
      booker,
      phone,
      address,
      payment,
      price,
      status: "Đã đặt hàng",
      items,
      created_at: new Date().toISOString(),
    };
    orders.unshift(newOrder);
    saveOrder(orders);
    return success(res, newOrder, "Đặt hàng thành công");
  },
  updateOrderStatus: (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const orders = orderJson();
    const orderIndex = orders.findIndex((o) => o.id === id);
    if (orderIndex === -1) {
      return res.status(400).json({ message: "Order not found" });
    }
    orders[orderIndex].status = status;
    saveOrder(orders);
    return success(res, orders[orderIndex], "Order status updated successfully");
  }
};
 