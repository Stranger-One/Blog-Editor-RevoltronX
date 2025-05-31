import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js"; 

const app = express();

app.use(cors(
  {
    origin: "http://localhost:5173", // Adjust this to your frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true,  
  }
));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
