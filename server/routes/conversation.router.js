import express, { Router } from "express";
import {
  getConversations,
  sendConversation,
} from "../controllers/conversation.controller.js";

const router = Router();

router.post("/", sendConversation);
router.get("/:userId", getConversations);

export default router;
