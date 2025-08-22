import axios, {type AxiosInstance,type AxiosResponse,type InternalAxiosRequestConfig } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000", // backend URL
  timeout: 10000, // optional timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (maybe redirect to login)
      console.error("Unauthorized! Redirecting...");
    }
    return Promise.reject(error);
  }
);

export default api;