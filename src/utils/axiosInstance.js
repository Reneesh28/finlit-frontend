import axios from "axios";

// Create instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:5000", // your backend URL
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // important if you later switch to cookies
});

// 🔐 Request Interceptor (Attach Token)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ⚠️ Response Interceptor (Handle Errors Globally)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle Unauthorized (401)
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login"; // redirect to login
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;