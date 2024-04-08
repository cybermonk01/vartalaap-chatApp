import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  loginUser,
  logout,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logout);
router.route("/single/").get(getUserById);
router.route("/").get(verifyJWT, getAllUsers);

export default router;
