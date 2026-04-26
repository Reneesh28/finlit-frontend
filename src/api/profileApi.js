import axios from "../utils/axiosInstance";

// 📊 Create or Update Profile
async function setProfile(profileData) {
    try {
        const response = await axios.post("/api/profile", profileData);

        return response.data;
    } catch (error) {
        throw (
            error.response?.data?.message ||
            error.message ||
            "Failed to save profile"
        );
    }
}

async function getProfile() {
    try {
        const response = await axios.get("/api/profile");

        return response.data;
    } catch (error) {
        throw (
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch profile"
        );
    }
}

export {
    setProfile,
    getProfile
};