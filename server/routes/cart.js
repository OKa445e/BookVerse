import express from "express";
import {getAllCart, newCartBook, removeBook} from "../controllers/cart.js";
import { authenticateToken } from "../controllers/userAuth.js";
import { clearCart } from "../controllers/order.js";

const app = express();

// /api/v1/cart/newcart
app.put("/newcart",newCartBook,authenticateToken,removeBook);

app.put("/removecart/:bookid",authenticateToken,removeBook);

app.delete("/clearcart",authenticateToken,clearCart);

app.get("/allcarts",authenticateToken,getAllCart);


export default app;