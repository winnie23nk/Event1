import express from "express";
import { Register, Login, logout } from "../controllers/UserController.js";
import isAuthenticated from "../config/Auth.js";
const router = express.Router();
router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", logout);

export default router;
