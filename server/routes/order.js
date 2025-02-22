import express from "express";
import { authenticateToken } from "../controllers/userAuth.js";
import { getAllOrders, getOrderHistory, orderPlace, updateOrder,clearOrderHistory, clearAllOrders } from "../controllers/order.js";

const app = express();

// /api/v1/order/placeorder
app.post("/placeorder", authenticateToken, orderPlace);

app.get("/orderhistory", authenticateToken, getOrderHistory);

app.get("/getallorders",authenticateToken,getAllOrders);

app.put("/statusupdate/:id",authenticateToken,updateOrder);

app.delete("/clearorderhistory", authenticateToken, clearOrderHistory);

app.delete("/clearorderadmin",authenticateToken,clearAllOrders)


export default app;