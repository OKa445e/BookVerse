import express from "express";
import { authenticateToken } from "../controllers/userAuth.js";
import { addBook, deleteBook, getAllBooks, getById, getRecentBooks, updateBook } from "../controllers/book.js";

const app = express.Router();


// route - /api/v1/book/add-book
app.post("/add-book",authenticateToken,addBook);

app.get("/get-all-books",getAllBooks);

app.get("/get-recent-book",getRecentBooks);

app.get("/:id",getById);

app.put("/update-book",authenticateToken,updateBook);

app.delete("/delete-book",authenticateToken,deleteBook);

export default app;