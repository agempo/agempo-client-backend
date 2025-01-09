import LoginController from "@/controller/LoginController";
import { Router } from "express";

const router = Router()

router.post("/login", LoginController.realizarLogin);

export default router;