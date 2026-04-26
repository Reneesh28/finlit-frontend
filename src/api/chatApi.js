import axios from "../utils/axiosInstance";

/*
========================================
🤖 CHAT API (FULL MODULE)
========================================
Endpoints Covered:
POST    /api/chat        → Send message (AI)
GET     /api/chat        → Get all chats
GET     /api/chat/:id    → Get single chat (messages)
DELETE  /api/chat/:id    → Delete chat
========================================
*/

// 🤖 Send Message (Create / Continue Chat)
async function sendMessage(data) {
    try {
        const response = await axios.post("/api/chat", data);
        return response.data;
    } catch (error) {
        throw (
            error.response?.data?.message ||
            error.message ||
            "Failed to send message"
        );
    }
}

// 📋 Get All Chats (Sidebar / List)
async function getChats() {
    try {
        const response = await axios.get("/api/chat");
        return response.data;
    } catch (error) {
        throw (
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch chats"
        );
    }
}

// 💬 Get Single Chat (Full Conversation)
async function getChatById(chatId) {
    try {
        const response = await axios.get(`/api/chat/${chatId}`);
        return response.data;
    } catch (error) {
        throw (
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch chat"
        );
    }
}

// ❌ Delete Chat
async function deleteChat(chatId) {
    try {
        const response = await axios.delete(`/api/chat/${chatId}`);
        return response.data;
    } catch (error) {
        throw (
            error.response?.data?.message ||
            error.message ||
            "Failed to delete chat"
        );
    }
}

// 📤 Export All
export { sendMessage, getChats, getChatById, deleteChat };