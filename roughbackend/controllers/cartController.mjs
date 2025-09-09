import { Cart } from "../models/cart.mjs";
import { Product } from "../models/products.mjs";

// 🔹 Get active cart for user
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id, status: "active" })
      .populate("items.product", "name price images");

    if (!cart) {
      return res.json({ items: [], totalPrice: 0 });
    }

    res.json(cart);
  } catch (err) {
    console.error("Get Cart Error:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

// 🔹 Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity, userId } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    let cart = await Cart.findOne({ user: userId, status: "active" });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if item with same product exists
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        priceAtTime: product.price,
      });
    }

    await cart.save();
    await cart.populate("items.product", "name price images");

    res.status(201).json(cart);
  } catch (err) {
    console.error("Add To Cart Error:", err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
};


export const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user.id, status: "active" });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = cart.items.id(itemId); // ✅ find by item _id
    if (!item) return res.status(404).json({ error: "Item not found in cart" });

    item.quantity = quantity;
    await cart.save();
    await cart.populate("items.product", "name price images");

    res.json(cart);
  } catch (err) {
    console.error("Update Cart Item Error:", err);
    res.status(500).json({ error: "Failed to update cart item" });
  }
};

// 🔹 Remove item from cart (by cart itemId)
export const removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id, status: "active" });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    
    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);

    await cart.save();
    await cart.populate("items.product", "name price images");

    res.json(cart);
  } catch (err) {
    console.error("Remove Cart Item Error:", err);
    res.status(500).json({ error: "Failed to remove item" });
  }
};
