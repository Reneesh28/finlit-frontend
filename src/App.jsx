import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  return (
    <Router>
      <Routes>
        {/* Main App Routes */}
        <Route path="/" element={<MainLayout />}>
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
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
