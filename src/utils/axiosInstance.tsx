import axios from "axios";

// backend url

const backendUrl = import.meta.env.VITE_BACKEND_URL

const axiosInstance = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;