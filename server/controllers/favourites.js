import User from "../models/user.js";
import Book from "../models/book.js";

export const favouriteBook = async (req, res) => {
  try {
    const { bookid, id } = req.headers;

    const userData = await User.findById(id);

    const bookFavourite = userData.favourites.includes(bookid);
    if (bookFavourite) {
      return res.status(200).json({
        message: "Book is already in favourites",
      });
    }
    await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
    return res.status(200).json({
      message: "Book added to favourites",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteFavouriteBook = async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    if (!userData.favourites.includes(bookid)) {
      return res.status(400).json({
        message: "Book already removed from favourites",
      });
    }
    const isBookFavourite = userData.favourites.includes(bookid);
    if (isBookFavourite) {
      await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
    }

    return res.status(200).json({
      message: "Book removed from favourites",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


export const getFavouriteBooks = async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("favourites");
    const favouriteBooks = userData.favourites;

    if (favouriteBooks.length === 0) {
      return res.status(400).json({
        message: "No favourite books have been added"
      });
    }
    
    return res.json({
      status: "Success",
      data: favouriteBooks,
    });
  } catch (error) {
    console.log(error);    
    return res.status(500).json({
      message: "An error occurred",
    });
  };
};
