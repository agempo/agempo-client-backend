import CONFIG from "@/config";
import axios from "axios";

const businessApi = axios.create({
    baseURL: CONFIG.AGEMPO_BUSINESS_API.BASE_URL
})

class AgempoBusinessIntegration{
    buscarEstabelecimentoPorId = async (estabelecimentoId: Number) => {
        const respose = await businessApi.get(`establishment/${estabelecimentoId}`)
        return respose.data
    }


    // obterToken = async () => {      
    // }
}

export default new AgempoBusinessIntegration()