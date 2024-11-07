import { Router } from "express";
import { login, signup } from "../controllers/users";

const router = Router();

router.post("/signup", signup as any); 
router.post("/login", login as any); 

export default router;
