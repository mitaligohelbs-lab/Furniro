import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default {
    get: axiosInstance.get,
    post:axiosInstance.post,
    delete:axiosInstance.delete,
    put:axiosInstance.put
}