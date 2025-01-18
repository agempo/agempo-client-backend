import { StatusEnum } from "@/types/iAgendamento";

export interface iAgendamento {
    agendamentoid?: number,
    clienteid: number,
    estabelecimentoid: number,
    horario: string,
    servicoid: number,
    profissionalid: number,
    qrcode: string,
    statusservico: StatusEnum
}
