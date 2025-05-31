// backend/routes/authRoutes.js
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// If you still get the error, try using: import * as bcrypt from "bcryptjs";
import User from "../models/UserModel.js";

const router = Router();
const JWT_SECRET = "your_jwt_secret"; // move to env in production

router.post("/register", async (req, res) => {
   const { fullname, email, password } = req.body;

  console.log({ fullname, email, password });

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const user = new User({
      fullname: fullname,
      email,
      password: hashPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "1d" }
    );

    await user.save();

    res.status(200).json({
      success: true,
      token,
      message: "Registration successfull :)",
    });
  } catch (error) {
    console.log("Registration failed :: ", error);
    res.status(500).json({
      success: false,
      message: "something went wrong...",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "Invalid credentials!",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    console.log("Password match status :: ", matchPassword);
    
    if (!matchPassword) {
      return res.status(200).json({
        success: false,
        message: "Invalid credentials!",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successfull :)",
      token,
      data: {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
      },
    });
  } catch (error) {
    console.log("Login failed :: ", error);
    res.status(500).json({
      success: false,
      message: "something went wrong...",
    });
  }
});

router.get("/user", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1] || req.query.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
      },
    });
    
  } catch (error) {
    console.log("Error fetching user :: ", error);
    res.status(500).json({
      success: false,
      message: "something went wrong...",
    });
  }
});

export default router;
