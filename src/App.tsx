
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { createClientComponentClient } from "@supabase/auth-helpers-react";

// Pages
import Index from "./pages/Index";
import JoinQuiz from "./pages/JoinQuiz";
import CreateQuiz from "./pages/CreateQuiz";
import QuizLobby from "./pages/QuizLobby";
import PlayQuiz from "./pages/PlayQuiz";
import QuizResults from "./pages/QuizResults";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WalletConnect from "./pages/WalletConnect";

const queryClient = new QueryClient();
const supabaseClient = createClientComponentClient();

const App = () => (
  <ThemeProvider defaultTheme="dark">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/wallet-connect" element={<WalletConnect />} />
            <Route path="/join-quiz" element={<JoinQuiz />} />
            <Route path="/create-quiz" element={<CreateQuiz />} />
            <Route path="/quiz-lobby/:quizCode" element={<QuizLobby />} />
            <Route path="/play-quiz/:quizCode" element={<PlayQuiz />} />
            <Route path="/quiz-results/:quizCode" element={<QuizResults />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
