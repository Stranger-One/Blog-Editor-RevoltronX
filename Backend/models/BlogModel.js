import { Schema, model } from "mongoose";

const blogSchema = new Schema({
    title: String,
    content: String,
    tags: [String],
    status: { type: String, enum: ["draft", "published"], default: "draft" },
}, { timestamps: true });

export default model("Blog", blogSchema);