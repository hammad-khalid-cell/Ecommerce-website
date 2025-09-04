import { Cart } from "../models/cart.mjs";
import { Product } from "../models/products.mjs";

// Get active cart for user
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id, status: "active" })
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

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity , userId} = req.body;
    

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    let cart = await Cart.findOne({ user: userId, status: "active" });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if item already exists
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
    res.status(201).json(cart);
  } catch (err) {
    console.error("Add To Cart Error:", err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

// Update quantity of item
export const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id, status: "active" });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ error: "Item not found in cart" });

    item.quantity = quantity;
    await cart.save();

    res.json(cart);
  } catch (err) {
    console.error("Update Cart Item Error:", err);
    res.status(500).json({ error: "Failed to update cart item" });
  }
};

// Remove item from cart
export const removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id, status: "active" });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error("Remove Cart Item Error:", err);
    res.status(500).json({ error: "Failed to remove item" });
  }
};
