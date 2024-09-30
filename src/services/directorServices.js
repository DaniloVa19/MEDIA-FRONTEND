import { axiosInstance } from "../helper/axios-config";

const getDirectores = () => {
    return axiosInstance.get('director', {
        header: {
            'Content-Type': 'applicaction/json'

        }
    })
}

const crearDirector = (data) => {
    return axiosInstance.post('director',data, {
        header: {
            'Content-Type': 'applicaction/json'

        }
    })
}

const actualizarDirector = (directorId,data) => {
    return axiosInstance.put(`director/${directorId}`, data,{
        header: {
            'Content-Type': 'applicaction/json'

        }
    })
}

const eliminarDirectorPorId = (directorId,data) => {
    return axiosInstance.delete(`director/${directorId}`, data,{
        header: {
            'Content-Type': 'applicaction/json'

        }
    })
}

export{
    actualizarDirector,
    crearDirector,
    getDirectores,
    eliminarDirectorPorId,
}