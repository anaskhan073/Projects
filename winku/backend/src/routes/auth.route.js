import express from "express";
import { register, verifyOTP, login, logout, getUser, forgotPassword, resetPassword } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/otp-verification", verifyOTP);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/get-user", isAuthenticated, getUser);
router.post("/forget-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

export default router;

