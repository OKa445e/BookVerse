import express from "express";
import { deleteFavouriteBook, favouriteBook, getFavouriteBooks } from "../controllers/favourites.js";
import { authenticateToken } from "../controllers/userAuth.js";



const app = express();

// /api/v1/favourite/favouritebook
app.put("/favouritebook", authenticateToken,favouriteBook);

app.get("/allfavouritebooks",authenticateToken,getFavouriteBooks)

app.put("/deletefavouritebook",authenticateToken,deleteFavouriteBook);





export default app;