import Book from "../models/book.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js"; // Corrected import

export const addBook = async(req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        if (user.role !== "admin") {
            return res.status(400).json({
                message: "Permission Access Denied"
            });
        }
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language,
        });
        await book.save();
        res.status(200).json({
            message: "Book Added successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const getAllBooks = async(req,res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        return res.json({
            status: "Success",
            data: books,
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occured",
        })
    }
}

export const getRecentBooks = async(req,res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(5);
        return res.json({
            status: "Success",
            data: books,
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occured",
        })
    }
}

export const getById = async(req,res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.json({
            status: "Success",
            data: book,
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurrred"
        });
    };
};

export const updateBook = async(req,res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid,{
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language,
        });

        return res.status(200).json({
            message: "Book Updated Successfully !",
        });
    } catch(error) {
        return res.status(500).json({
            message: "An errro occurred",
        });
    };
};

export const deleteBook = async(req,res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({
            message: "Book deleted Successfully",
        });
    } catch(error) {
        return res.status(500).json({
            message: "An error occurred",
        });
    };
};