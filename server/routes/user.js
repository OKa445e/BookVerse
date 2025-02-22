import express from "express";
import { signUpUser,signInUser,userInformation,updateAddress } from "../controllers/user.js";
import {authenticateToken} from "../controllers/userAuth.js"

const app = express.Router();

// route-/api/v1/user/signup
app.post("/signup",signUpUser);

app.post("/signIn",signInUser);

app.get("/user-information",authenticateToken,userInformation);

app.put("/update-address",authenticateToken,updateAddress);

export default app;