import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 30 },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
      unique: true,
    },
    password: { type: String, required: true, minlength: 3, maxlength: 1024 },
  },
  {
    timestamps: true,
  }
);

export const userModel = mongoose.model("User", userSchema);


