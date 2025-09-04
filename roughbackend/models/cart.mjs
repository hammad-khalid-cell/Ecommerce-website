import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to Product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  priceAtTime: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // If not logged in (guest), we’ll handle cart differently
  },
  items: [cartItemSchema],
  totalPrice: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["active", "ordered", "abandoned"],
    default: "active",
  },
}, { timestamps: true });

// Auto-calculate total before save
cartSchema.pre("save", function (next) {
  this.totalPrice = this.items.reduce((sum, item) => sum + item.priceAtTime * item.quantity, 0);
  next();
});

export const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
