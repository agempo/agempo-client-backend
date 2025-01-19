import { ROLES } from "@/types/iRoles"

export interface iCliente {
    clienteid?: number
    nome: string 
    sobrenome: string 
    email: string 
    senha: string
    cpf: string
    datanascimento: Date
    role: ROLES
    assinaturaId?: number
    ativo: boolean
}