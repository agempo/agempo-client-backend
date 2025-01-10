import { ROLES } from "@/types/iRoles"

export interface iCliente {
    clienteId?: number
    nome: string 
    sobrenome: string 
    email: string 
    senha: string
    cpf: string
    dataNascimento: Date
    role: ROLES
}