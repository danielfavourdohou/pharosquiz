
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import JoinQuiz from "./pages/JoinQuiz";
import CreateQuiz from "./pages/CreateQuiz";
import QuizLobby from "./pages/QuizLobby";
import PlayQuiz from "./pages/PlayQuiz";
import QuizResults from "./pages/QuizResults";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WalletConnect from "./pages/WalletConnect";

const queryClient = new QueryClient();

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/wallet-connect" element={
                  <ProtectedRoute>
                    <WalletConnect />
                  </ProtectedRoute>
                } />
                <Route path="/join-quiz" element={<JoinQuiz />} />
                <Route path="/create-quiz" element={
                  <ProtectedRoute>
                    <CreateQuiz />
                  </ProtectedRoute>
                } />
                <Route path="/quiz-lobby/:quizCode" element={
                  <ProtectedRoute>
                    <QuizLobby />
                  </ProtectedRoute>
                } />
                <Route path="/play-quiz/:quizCode" element={
                  <ProtectedRoute>
                    <PlayQuiz />
                  </ProtectedRoute>
                } />
                <Route path="/quiz-results/:quizCode" element={
                  <ProtectedRoute>
                    <QuizResults />
                  </ProtectedRoute>
                } />
                
                {/* Catch all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
