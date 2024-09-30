import { axiosInstance } from "../helper/axios-config";

const getGeneros = () => {
    return axiosInstance.get('genero', {
        header: {
            'Content-Type': 'applicaction/json'

        }
    })
}

const crearGenero = (data) => {
    return axiosInstance.post('genero',data, {
        header: {
            'Content-Type': 'applicaction/json'

        }
    })
}

const actualizarGenero = (generoId,data) => {
    return axiosInstance.put(`genero/${generoId}`, data,{
        header: {
            'Content-Type': 'applicaction/json'

        }
    })
}

const eliminarGeneroPorId = (generoId,data) => {
    return axiosInstance.delete(`genero/${generoId}`, data,{
        header: {
            'Content-Type': 'applicaction/json'

        }
    })
}

export{
    actualizarGenero,
    crearGenero,
    getGeneros,
    eliminarGeneroPorId,
}