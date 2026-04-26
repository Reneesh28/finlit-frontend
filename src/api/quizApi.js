import axios from "../utils/axiosInstance";

/*
========================================
🎮 QUIZ API (FULL MODULE)
========================================
Endpoints Covered:

GET    /api/quiz                → Get quiz questions
POST   /api/quiz/submit        → Submit quiz
GET    /api/quiz/results       → Get past results
GET    /api/quiz/analytics     → Get performance analytics
GET    /api/quiz/leaderboard   → Get leaderboard
POST   /api/quiz/explain       → Get AI explanations
========================================
*/

// 📥 Get Quiz Questions
async function getQuizQuestions(limit = 15) {
    try {
        const response = await axios.get(`/api/quiz?limit=${limit}`);
        return response.data;
    } catch (error) {
        throw (
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch quiz questions"
        );
    }
}

// 📝 Submit Quiz
async function submitQuiz(answers) {
    try {
        const response = await axios.post("/api/quiz/submit", {
            answers
        });
        return response.data;
    } catch (error) {
        throw (
            error.response?.data?.message ||
            error.message ||
            "Failed to submit quiz"
        );
    }
}

// 📊 Get Quiz Results (History)
async function getQuizResults() {
    try {
        const response = await axios.get("/api/quiz/results");
        return response.data;
    } catch (error) {
        throw (
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch quiz results"
        );
    }
}

// 📈 Get Quiz Analytics (AI Personalization)
async function getQuizAnalytics() {
    try {
        const response = await axios.get("/api/quiz/analytics");
        return response.data;
    } catch (error) {
        throw (
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch quiz analytics"
        );
    }
}

// 🏆 Get Leaderboard
async function getLeaderboard() {
    try {
        const response = await axios.get("/api/quiz/leaderboard");
        return response.data;
    } catch (error) {
        throw (
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch leaderboard"
        );
    }
}

// 🤖 Get AI Explanations
async function explainAnswers(answers) {
    try {
        const response = await axios.post("/api/quiz/explain", {
            answers
        });
        return response.data;
    } catch (error) {
        throw (
            error.response?.data?.message ||
            error.message ||
            "Failed to get explanations"
        );
    }
}

// 📤 Export All APIs
export {
    getQuizQuestions,
    submitQuiz,
    getQuizResults,
    getQuizAnalytics,
    getLeaderboard,
    explainAnswers
};