import { Router } from "express";
import { getCurrentUser } from "../controllers/users.js";

const router = Router();

router.get("/me", getCurrentUser);

export default router;
