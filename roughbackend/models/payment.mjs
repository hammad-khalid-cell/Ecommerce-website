import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  method: {
    type: String,
    enum: ["Credit Card", "Debit Card", "PayPal", "Stripe", "Cash on Delivery"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Failed", "Refunded"],
    default: "Pending",
  },
  transactionId: {
    type: String, // From payment gateway (e.g., Stripe/PayPal)
    unique: true,
    sparse: true,
  },
}, { timestamps: true });

export const Payment = mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
