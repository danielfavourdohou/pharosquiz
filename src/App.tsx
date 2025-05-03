
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import JoinQuiz from "./pages/JoinQuiz";
import CreateQuiz from "./pages/CreateQuiz";
import QuizLobby from "./pages/QuizLobby";
import PlayQuiz from "./pages/PlayQuiz";
import QuizResults from "./pages/QuizResults";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
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
);

export default App;
