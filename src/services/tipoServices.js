import { axiosInstance } from "../helper/axios-config";

const getTipos = () => {
    return axiosInstance.get('tipo', {
        header: {
            'Content-Type': 'applicaction/json'

        }
    })
}

const crearTipo = (data) => {
    return axiosInstance.post('tipo',data, {
        header: {
            'Content-Type': 'applicaction/json'

        }
    })
}

const actualizarTipo = (tipoId,data) => {
    return axiosInstance.put(`tipo/${tipoId}`, data,{
        header: {
            'Content-Type': 'applicaction/json'

        }
    })
}

const eliminarTipoPorId = (tipoId,data) => {
    return axiosInstance.delete(`tipo/${tipoId}`, data,{
        header: {
            'Content-Type': 'applicaction/json'

        }
    })
}

export{
    actualizarTipo,
    crearTipo,
    getTipos,
    eliminarTipoPorId,
}
