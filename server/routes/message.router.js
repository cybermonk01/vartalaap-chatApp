import express, { Router } from "express";
import { getMessage, sendMessage } from "../controllers/message.controller.js";

const router = Router();

router.post("/", sendMessage);
router.get("/:conversationId", getMessage);
export default router;
