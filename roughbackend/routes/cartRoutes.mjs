import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} from "../controllers/cartController.mjs";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

router.use(authMiddleware); 

router.get("/", getCart);
router.post("/create", addToCart);
router.patch("/:itemId", updateCartItem);
router.delete("/:itemId", removeCartItem);

export default router;
