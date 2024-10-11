import axios from "axios";


const axiosInstance = axios.create(
    {
        // baseURL: 'http://localhost:4000/'
        baseURL: 'https://backend-media-53fm.onrender.com'
})

export {
    axiosInstance
}
