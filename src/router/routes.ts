import ClienteController from "@/controller/ClienteController";
import loginController from "@/controller/LoginController";
import { Router } from "express";

const router = Router()

router.post("/login", loginController.realizarLogin);

router.post("/cliente", ClienteController.cadastrarCliente)

//TODO: validar a role do usuario para liberar a rota
router.get("/cliente", ClienteController.listarClientes);

export default router;