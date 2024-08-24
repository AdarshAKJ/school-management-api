import express from "express";
import { createTask, updateTask, listTask, deleteTask } from "../controllers/task.js";
import authenticateUser from "../middleware/auth.js"; // Import the middleware

const router = express.Router();

router.post("/create", authenticateUser, createTask);
router.post("/update/:id", authenticateUser, updateTask);
router.get("/list", authenticateUser, listTask);
router.get("/delete/:id", authenticateUser, deleteTask);
export default router;
