import axios from "../utils/axiosInstance";

// 🔐 Register User
async function registerUser(userData) {
    try {
        const response = await axios.post("/api/auth/register", userData);

        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }

        return response.data;
    } catch (error) {
        throw (
            error.response?.data?.message ||
            error.message ||
            "Registration failed"
        );
    }
}

// 🔐 Login User
async function loginUser(userData) {
    try {
        const response = await axios.post("/api/auth/login", userData);

        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }

        return response.data;
    } catch (error) {
        throw (
            error.response?.data?.message ||
            error.message ||
            "Login failed"
        );
    }
}

// 📤 Export at end (clean structure)
export {
    registerUser,
    loginUser
};