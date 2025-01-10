import ClienteController from "@/controller/ClienteController";
import LoginController from "@/controller/loginController";
import { Router } from "express";

const router = Router()

router.post("/login", LoginController.realizarLogin);

router.post("/cliente", ClienteController.cadastrarCliente)

export default router;