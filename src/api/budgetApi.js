import axios from "../utils/axiosInstance";

/*
========================================
💰 BUDGET API (FULL MODULE)
========================================
Endpoints Covered:
POST   /api/budget        → Set or update budget
GET    /api/budget        → Get all budgets
GET    /api/budget?month  → Get budgets by month
========================================
*/

// ➕ Set or Update Budget
async function setBudget(budgetData) {
    try {
        const response = await axios.post("/api/budget", budgetData);
        return response.data;
    } catch (error) {
        throw (
            error.response?.data?.message ||
            error.message ||
            "Failed to set budget"
        );
    }
}

// 📊 Get Budgets (optional month filter)
async function getBudgets(month) {
    try {
        let url = "/api/budget";

        if (month) {
            url += `?month=${month}`;
        }

        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw (
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch budgets"
        );
    }
}

// 📤 Export all functions
export { setBudget, getBudgets };