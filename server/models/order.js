import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User", // Ensure this matches the User model name
    },
    book: {
      type: mongoose.Types.ObjectId,
      ref: "Book", // Ensure this matches the Book model name
    },
    status: {
      type: String,
      default: "Order Placed",
      enum: ["Order Placed", "Out for Delivery", "Delivered", "Canceled"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);