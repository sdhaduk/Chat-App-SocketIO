import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import userRoute from "./routes/userRoute.js";
import chatRoute from "./routes/chatRoute.js";
import messageRoute from "./routes/messageRoute.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT, (req, res) => {
      console.log(`Server running on Port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
