import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";
import { authorizeRoles } from "../middlewares/roleMiddleware.mjs";
import { Product } from "../models/products.mjs";
import { validationResult } from "express-validator";
import multer from "multer";
import {uploadToCloudinary, deleteFromCloudinary} from "../utils/cloudinary.mjs"

const router = express.Router();

const storage = multer.memoryStorage();
const upload  =  multer({storage});



router.post(
  "/create",
  authMiddleware,
  authorizeRoles("admin"),
  upload.array("images", 5),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description, price, stock, category, status } = req.body;

      console.log("Req.body:", req.body);
      console.log("Req.files:", req.files);

      // ✅ Correct check (req.files instead of req.file)
      if (!name || !description || !price || !stock || !category || !status || !req.files) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // ✅ Upload images to Cloudinary
      let uploadedImages = [];
      if (req.files.length > 0) {
        const uploadPromises = req.files.map((file) =>
          uploadToCloudinary(file.buffer, "products")
        );
        const results = await Promise.all(uploadPromises);
        uploadedImages = results.map((r) => r.secure_url);
      }

      // ✅ Check if product already exists
      const existingProduct = await Product.findOne({ name });
      if (existingProduct) {
        return res.status(400).json({ error: "Product already exists" });
      }

      // ✅ Cast numbers properly
      const newProduct = new Product({
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        category,
        images: uploadedImages,
        status,
      });

      const savedProduct = await newProduct.save();
      console.log("Uploaded images:", uploadedImages);


      res.status(201).json(savedProduct); // ✅ return the saved product
    } catch (err) {
      console.error("Error saving product:", err);
      res.status(500).json({ error: "Failed to save product" });
    }
  }
);



router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  upload.array("images", 5),
  async (req, res) => {
    try {
      const { name, description, price, stock, category, status } = req.body;

      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Upload new images
      let uploadedImages = [];
      if (req.files && req.files.length > 0) {
        const uploadPromises = req.files.map((file) =>
          uploadToCloudinary(file.buffer, "products")
        );
        const results = await Promise.all(uploadPromises);
        uploadedImages = results.map((r) => r.secure_url);
      }

      // Update fields
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price ? Number(price) : product.price;
      product.stock = stock ? Number(stock) : product.stock;
      product.category = category || product.category;
      product.status = status || product.status;

      // ✅ Merge old + new images
      if (uploadedImages.length > 0) {
        product.images = [...product.images, ...uploadedImages];
      }

      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    } catch (err) {
      console.error("Error updating product:", err);
      res.status(500).json({ error: "Failed to update product" });
    }
  }
);


router.delete(
  "/:id/image",
  authMiddleware,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { imageUrl } = req.body;

      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ error: "Product not found" });

      // Remove from Cloudinary
      await deleteFromCloudinary(imageUrl);

      // Remove from DB
      product.images = product.images.filter((img) => img !== imageUrl);
      await product.save();

      res.json({ success: true, images: product.images });
    } catch (err) {
      console.error("Error deleting image:", err);
      res.status(500).json({ error: "Failed to delete image" });
    }
  }
);

// --- DELETE PRODUCT (Admin only) ---
router.delete("/:id", authMiddleware, authorizeRoles("admin"), async (req, res) => {
  console.log("this is the id ",(req.params.id));
  
  
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
router.get("/get", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name"); // match the schema field "category"

    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err.message);
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
