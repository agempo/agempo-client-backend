export type iAgendamentoRequest = {
    estabelecimentoId: number,
    servicoId: number,
    horario: Date,
    profissionalId: number
}

export enum StatusEnum {
    "pendente" = "pendente", 
    "realizado" = "realizado"
}