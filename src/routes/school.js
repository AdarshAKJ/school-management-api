import express from "express";
import { listSchools, addSchool } from "../controllers/auth.js";

const router = express.Router();

router.post("/addSchool", addSchool);
router.get("/listSchools/:latitude/:longitude", listSchools);


export default router;

