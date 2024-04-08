import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import cookieParser from "cookie-parser";
import express, { Router } from "express";
import { Server } from "socket.io";
import { registerUser } from "./controllers/user.controller.js";
import connectDB from "./db/index.js";
import { upload } from "./middlewares/multer.middleware.js";
import userRouter from "./routes/user.router.js";
import conversationRouter from "./routes/conversation.router.js";
const app = express();

const PORT = 5000;

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

connectDB();

const router = Router();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/conversations", conversationRouter);

app.listen(PORT, () => {
  console.log(`server is listening on PORT ${PORT}`);
});
