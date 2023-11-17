import express from "express";
import { userModel } from "../models/userModel.js";
import {findUser, getUsers, loginUser, registerUser} from "../controllers/userController.js"

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser); 
router.get("/", getUsers);


export default router;
