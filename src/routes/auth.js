import express from "express";
import { login, register } from "../controllers/auth.js";
import authenticateUser from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);


export default router;

