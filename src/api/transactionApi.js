import axios from "../utils/axiosInstance";

/*
========================================
💸 TRANSACTION API (FULL MODULE)
========================================
Endpoints Covered:
POST    /api/transactions        → Add transaction
GET     /api/transactions        → Get all transactions
DELETE  /api/transactions/:id    → Delete transaction
========================================
*/

// ➕ Add Transaction
async function addTransaction(transactionData) {
    try {
        const payload = {
            ...transactionData,
            description: transactionData.title // Map UI 'title' to DB 'description'
        };
        const response = await axios.post("/api/transactions", payload);
        return response.data;
    } catch (error) {
        throw (
            error.response?.data?.message ||
            error.message ||
            "Failed to add transaction"
        );
    }
}

// 📊 Get All Transactions
async function getTransactions() {
    try {
        const response = await axios.get("/api/transactions");
        // Map DB 'description' to UI 'title'
        const mappedData = response.data.data.map(t => ({
            ...t,
            id: t._id, // Map MongoDB _id to id for convenience
            title: t.description || "Untitled Transaction"
        }));
        return { ...response.data, data: mappedData };
    } catch (error) {
        throw (
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch transactions"
        );
    }
}

// ❌ Delete Transaction
async function deleteTransaction(id) {
    try {
        const response = await axios.delete(`/api/transactions/${id}`);
        return response.data;
    } catch (error) {
        throw (
            error.response?.data?.message ||
            error.message ||
            "Failed to delete transaction"
        );
    }
}

// ✏️ Update Transaction
async function updateTransaction(id, transactionData) {
    try {
        const payload = {
            ...transactionData,
            description: transactionData.title // Map UI 'title' to DB 'description'
        };
        const response = await axios.put(`/api/transactions/${id}`, payload);
        return response.data;
    } catch (error) {
        throw (
            error.response?.data?.message ||
            error.message ||
            "Failed to update transaction"
        );
    }
}

// 📤 Export All
export { addTransaction, getTransactions, deleteTransaction, updateTransaction };