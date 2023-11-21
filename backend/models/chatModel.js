import mongoose, { Mongoose } from "mongoose";

const chatSchema = new Mongoose.Schema(
  {
    members: Array,
  },
  {
    timestamps: true,
  }
);

export const chatModel = mongoose.model("Chat", chatSchema);

