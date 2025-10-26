import axios from "axios";
import { getEnvs } from "../../../helper/getEnvs";

const { VITE_API_URL } = getEnvs();

const adminApi = axios.create({
  baseURL: VITE_API_URL,
});

// adminApi.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token && config.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default adminApi;
