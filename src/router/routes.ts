import ClienteController from "@/controller/ClienteController";
import loginController from "@/controller/LoginController";
import { validarAdmin } from "@/middleware/security";
import { Router } from "express";

const router = Router()

router.post("/login", loginController.realizarLogin);

router.post("/cliente", ClienteController.cadastrarCliente)
router.get("/cliente", validarAdmin, ClienteController.listarClientes);
router.get("/cliente/:clienteId", validarAdmin, ClienteController.buscarClientePorId);
router.put("/cliente/:clienteId", validarAdmin, ClienteController.alterarCliente)
router.delete("/cliente/:clienteId", validarAdmin, ClienteController.deletarCliente)

export default router;