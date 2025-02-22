import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUpUser = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      return res.status(400).json({
        message: "Username Already exists",
      });
    }

    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      email: email,
      password: hashPass,
      address: address,
    });
    await newUser.save();
    return res.status(200).json({ message: "sign up successfully" });
  } catch (error) {
    res.status(400).json({
      message: `Internal Server Error ${error}`,
    });
  }
};

export const signInUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    await bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
        const auth = [
          { name: existingUser.username },
          { role: existingUser.role },
        ];
        const token = jwt.sign({ auth }, "book123", {
          expiresIn: "30d",
        });
        res
          .status(200)
          .json({
            id: existingUser._id,
            role: existingUser.role,
            token: token,
          });
      } else {
        res.status(400).json({ message: "invalid credentials" });
      }
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const userInformation = async(req,res) => {
    try{
        const { id } = req.headers;
        const data = await User.findById(id).select("-password");
        return res.status(200).json(data);

    } catch (err) {
        return res.status(500).json({ message: "Internal Server error" });
      }
};

export const updateAddress = async(req,res) => {
    try{
        const { id } = req.headers;
        const { address } = req.body;
        await User.findByIdAndUpdate(id, { address: address });
        return res.status(200).json({ message: "Address updated Successfully" });
    } catch(error) {
        res.status(500).json({ message: "Internal server Error "});
    }
}