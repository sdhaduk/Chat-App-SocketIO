import { createMessage, findMessages } from "../controllers/messageController.js";
import express from "express";

const router = express.Router();

router.post("/", createMessage);
router.get("/:chatId", findMessages);

export default router;