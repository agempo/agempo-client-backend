import planoRepository from "@/data/planoRepository";

class PlanoService{

    listarPlanosService = async () => {
        try {
            return planoRepository.listarPlanosBD();
        } catch (error) {
            throw error;
        }
    }
}

export default new PlanoService()