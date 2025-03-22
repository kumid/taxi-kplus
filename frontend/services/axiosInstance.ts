import axios from "axios";

const apiUrl = "https://your-api.com"; // Replace with your API URL

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

// Add token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Or get from secure storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
