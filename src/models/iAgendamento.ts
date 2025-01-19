
export interface iAgendamento {
    agendamentoid?: number,
    clienteid: number,
    estabelecimentoid: number,
    horario: Date,
    servicoid: number,
    profissionalid: number,
    qrcode?: string,
    hashCode?: string,
    servicoRealizado: boolean
    pagamentoRealizado: boolean
}
