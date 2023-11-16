import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT, (req, res) => {
        console.log(`Server running on Port: ${process.env.PORT}`)
    });
})
.catch((error) => {
    console.log(error)
});





