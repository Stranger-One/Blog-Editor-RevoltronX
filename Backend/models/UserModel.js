import { Schema, model } from "mongoose";

const userSchema = new Schema({
  fullname: String,
  email: String,
  password: {
    type: String,
    select: false, // This will prevent the password from being returned in queries
  },
});

export default model("User", userSchema);
