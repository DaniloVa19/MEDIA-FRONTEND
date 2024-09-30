import { axiosInstance } from "../helper/axios-config";

const getProductoras = () => {
    return axiosInstance.get('productora', {
        header: {
            'Content-Type': 'applicaction/json'

        }
    })
}

const crearProductora = (data) => {
    return axiosInstance.post('productora',data, {
        header: {
            'Content-Type': 'applicaction/json'

        }
    })
}

const actualizarProductora = (productoraId,data) => {
    return axiosInstance.put(`productora/${productoraId}`, data,{
        header: {
            'Content-Type': 'applicaction/json'

        }
    })
}

const eliminarProductoraPorId = (productoraId,data) => {
    return axiosInstance.delete(`productora/${productoraId}`, data,{
        header: {
            'Content-Type': 'applicaction/json'

        }
    })
}

export{
    actualizarProductora,
    crearProductora,
    getProductoras,
    eliminarProductoraPorId,
}