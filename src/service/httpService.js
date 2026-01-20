import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:3000/"
})

export default {
    get: axiosInstance.get,
    post:axiosInstance.post,
    delete:axiosInstance.delete,
    put:axiosInstance.put
}