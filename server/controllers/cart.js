import User from "../models/user.js"

export const newCartBook = async(req,res) => {
    try {
        const { bookid,id } = req.headers;
        const userData = await User.findById(id);
        const isBookinCart = userData.cart.includes(bookid);
        if(isBookinCart) {
            return res.json({
                status: "Success",
                message: "Book is already in cart",
            });
        }
      await User.findByIdAndUpdate(id, {
        $push: { cart: bookid},
      });

      return res.json({
        status: "Success",
        message: "Book added to cart",
      });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred"
        });
    };
};

export const removeBook = async(req,res) => {
  try {
    const { bookid } = req.params;
    const { id } = req.headers; 
    
    const userData = await User.findById(id);
    const isBookinCart = userData.cart.includes(bookid);

    if(!isBookinCart) {
      return res.json({
          status: "Success",
          message: "Book is already removed from the cart",
      });
  }
    await User.findByIdAndUpdate(id, {
      $pull: { cart: bookid },
    });

    return res.json({
      status: "Success",
      message: "Book removed from cart"
    })
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred",
    }
    );
  }
};

export const getAllCart = async(req,res) => {
  try{
   const { id } = req.headers;
   const userData = await User.findById(id).populate("cart");

   if (!userData) {
     return res.status(404).json({
       message: "User not found",
     });
   }

   const cart = userData.cart.reverse();

   return res.json({
     status: "Success",
     data: cart,
   });
  } catch (error) {
   console.log(error);
   
   return res.status(500).json({
     message: "An error occurred"
   });
  }
}