import Order from "../models/order.js";
import User from "../models/user.js";
import Book from "../models/book.js";


export const orderPlace = async(req,res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        for(const orderData of order) {
            const newOrder = new Order({ user:id, book: orderData._id});
            const orderDataDb = await newOrder.save();

            // saving order in user model
            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataDb._id}
            });

            await User.findByIdAndUpdate(id, {
                $pull: {
                    cart: orderData._id
                },
            });
        }
        return res.json({
            status: "Success",
            message: "Order Placed Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred"
        });
    };
};

export const getOrderHistory = async(req,res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" },
        });

        const orderData = userData.orders.reverse();
        return res.json({
            status: "Success",
            data: orderData,
        });
    } catch (error) {
        
        
        return res.status(500).json({
            message: "An error occurred"
        });
    };
};
// admin get all order
export const getAllOrders = async(req,res) => {
    try {
        const userData = await Order.find()
        .populate({
            path: "book",
        })
        .populate({
            path: "user",
        })
        .sort({
            createdAt: -1
        });

        return res.json({
            status: "Success",
            data: userData,
        });
    } catch(error) {
        return res.status(500).json({
            message: "An error occurred"
        });
    };
};
// order update by admin 
export const updateOrder = async(req,res) => {

    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, {
            status: req.body.status
        });
        return res.json({
            status:"Success",
            message: "Status updated Successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred"
        });
    };
};

export const clearCart = async (req, res) => {
    try {
      const { id } = req.headers; // Assuming you have user information in the request
      await User.findByIdAndUpdate(id, {
        $set: { cart: [] }
      });
      return res.json({
        status: "Success",
        message: "Cart has been cleared"
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error occurred"
      });
    }
};

export const clearOrderHistory = async (req, res) => {
    try {
      const { id } = req.headers; // Assuming you have user information in the request
  
      // Find the user and clear their orders
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }
  
      // Clear all orders from the user's order history
      const orderIds = user.orders; // Retrieve the order IDs associated with the user
  
      // Delete all orders from the Order collection
      await Order.deleteMany({ _id: { $in: orderIds } });
  
      // Remove all references to orders in the user's orders array
      await User.findByIdAndUpdate(id, {
        $set: { orders: [] }
      });
  
      return res.json({
        status: "Success",
        message: "Order history cleared successfully"
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "An error occurred"
      });
    }
  };

// Admin order cancel
export const clearAllOrders = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
  
      if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "You are not authorized to perform this action" });
      }
  
     
      await Order.deleteMany({});
  
      return res.json({
        status: "Success",
        message: "All orders cleared successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "An error occurred while clearing orders",
      });
    }
  };
  