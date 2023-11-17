import express from "express";
import { userModel } from "../models/userModel.js";
import {registerUser} from "../controllers/userController.js"

const router = express.Router();

router.post("/register", registerUser);

export default router;
