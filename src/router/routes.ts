import AgendamentoController from "@/controller/AgendamentoController";
import AssinaturaController from "@/controller/AssinaturaController";
import ClienteController from "@/controller/ClienteController";
import LoginController from "@/controller/LoginController";
import PlanoController from "@/controller/PlanoController";
import { validarAdmin } from "@/middleware/security";
import { Router } from "express";

const router = Router()

router.post("/login", LoginController.realizarLogin);

router.post("/cliente", ClienteController.cadastrarCliente)
router.get("/cliente", validarAdmin, ClienteController.listarClientes);
router.get("/cliente/:clienteId", validarAdmin, ClienteController.buscarClientePorId);
router.put("/cliente/:clienteId", validarAdmin, ClienteController.alterarCliente);
router.delete("/cliente/:clienteId", validarAdmin, ClienteController.deletarCliente);

router.post("/agendamento", AgendamentoController.agendarServico);
router.get("/agendamento", AgendamentoController.listarAgendamentos);
router.get("/agendamento/:agendamentoId", AgendamentoController.buscarAgendamentoPorId);

router.post("/assinatura/assinar", AssinaturaController.realizarAssinatura);
router.get("/assinatura/consultar", AssinaturaController.consultarAssinatura);

router.get("/planos", PlanoController.listarPlanos)

export default router;