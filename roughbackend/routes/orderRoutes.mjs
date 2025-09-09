import express from "express";
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.mjs";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

// 🛒 Customer
router.post("/", authMiddleware, createOrder);          // Place order
router.get("/my-orders", authMiddleware, getMyOrders);  // Get logged-in user's orders
router.get("/:id", authMiddleware, getOrderById);       // Get single order

// 🛒 Admin
router.get("/", authMiddleware, getAllOrders);          // Get all orders
router.put("/:id/status", authMiddleware, updateOrderStatus); // Update status
router.delete("/:id", authMiddleware, deleteOrder);     // Delete order

export default router;
