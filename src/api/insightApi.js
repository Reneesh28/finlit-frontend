import axios from "../utils/axiosInstance";

/**
 * 📈 INSIGHTS API
 * Handles fetching financial intelligence and trends.
 */

export const getInsights = async () => {
    try {
        const response = await axios.get("/api/insights");
        return response.data;
    } catch (error) {
        throw (
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch insights"
        );
    }
};
