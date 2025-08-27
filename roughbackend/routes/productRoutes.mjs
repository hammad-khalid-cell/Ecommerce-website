import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";
import { authorizeRoles } from "../middlewares/roleMiddleware.mjs";
import { Product } from "../models/products.mjs";
import { validationResult } from "express-validator";

const router = express.Router();

// --- CREATE PRODUCT (Admin only) ---
router.post("/", authMiddleware, authorizeRoles("admin"), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, description, price, stock, category, images, status } = req.body;

    if (!name || !description || !price || !stock || !category || !images || !status) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ error: "Product already exists" });
    }

    const newProduct = new Product({ name, description, price, stock, category, images, status });
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (err) {
    console.log("Error saving product", err);
    res.status(500).json({ error: "Failed to save product" });
  }
});

// --- UPDATE PRODUCT (Admin only) ---
router.put("/:id", authMiddleware, authorizeRoles("admin"), async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.log("Error updating product", err);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// --- DELETE PRODUCT (Admin only) ---
router.delete("/:id", authMiddleware, authorizeRoles("admin"), async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted ✅" });
  } catch (err) {
    console.log("Error deleting product", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// --- GET ALL PRODUCTS (Public) ---
router.get("/", async (req, res) => {
  try {
    const { category, status, minPrice, maxPrice, search } = req.query;

    let filters = {};
    if (category) filters.category = category;
    if (status) filters.status = status;
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }
    if (search) {
      filters.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(filters).populate("category", "name");

    res.json(products);
  } catch (err) {
    console.log("Error fetching products", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// --- GET SINGLE PRODUCT (Public) ---
router.get("/:id", async (req, res) => {
  try {
    console.log("this is the request id ",req.params.id);
    
    const product = await Product.findById(req.params.id)


    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.log("Error fetching product", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

export default router;
