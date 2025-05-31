import { Router } from "express";
import Blog from "../models/BlogModel.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.post("/save-draft", auth, async (req, res) => {
  const { id, title, content, tags } = req.body;
  try {
    let blog;
    if (id) {
      blog = await Blog.findByIdAndUpdate(
        id,
        { title, content, tags, status: "draft" },
        { new: true }
      );
    } else {
      blog = new Blog({ title, content, tags, status: "draft" });
      await blog.save();
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/publish", auth, async (req, res) => {
  const { id, title, content, tags } = req.body;
  try {
    let blog;
    if (id) {
      blog = await Blog.findByIdAndUpdate(
        id,
        { title, content, tags, status: "published" },
        { new: true }
      );
    } else {
      blog = new Blog({ title, content, tags, status: "published" });
      await blog.save();
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ updatedAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
