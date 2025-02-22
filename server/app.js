import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";

// routes imports
import userRoutes from "./routes/user.js"
import bookRoutes from "./routes/book.js"
import favouriteRoutes from "./routes/favourites.js"
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js";
import contactRoutes from "./routes/contact.js"



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();


app.get("/", (req, res) => {
  res.send("HEY THERE");
});

// routes
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/book",bookRoutes);
app.use("/api/v1/favourite",favouriteRoutes);
app.use("/api/v1/cart",cartRoutes);
app.use("/api/v1/order",orderRoutes);
app.use("/api/v1/contact",contactRoutes);



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Connected to the server on port ${PORT}`);
});
