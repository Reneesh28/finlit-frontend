import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MainLayout } from "./components/layout/MainLayout";

// Lazy loading placeholders
import Dashboard from "./pages/Dashboard/Dashboard";
import Learn from "./pages/Learn/Learn";
import Transactions from "./pages/Transactions/Transactions";
import Chat from "./pages/Chat/Chat";
import Insights from "./pages/Insights/Insights";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Quiz from "./pages/Learn/Quiz";
import Leaderboard from "./pages/Profile/Leaderboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Main App Routes */}
        <Route 
          path="/" 
          element={isAuthenticated ? <MainLayout /> : <Navigate to="/auth/login" />}
        >
          <Route index element={<Dashboard />} />
          <Route path="learn" element={<Learn />} />
          <Route path="learn/quiz" element={<Quiz />} />

          <Route path="transactions" element={<Transactions />} />
          <Route path="chat" element={<Chat />} />
          <Route path="insights" element={<Insights />} />
          <Route path="profile" element={<Profile />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="settings" element={<Settings />} />

        </Route>

        {/* Auth Routes */}
        <Route path="/auth">
          <Route path="login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
          <Route path="register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
