
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export default function JoinQuizForm() {
  const [quizCode, setQuizCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  // Handle code input change
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits
    const value = e.target.value.replace(/\D/g, '');
    
    // Limit to 6 digits
    if (value.length <= 6) {
      setQuizCode(value);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (quizCode.length !== 6) {
      toast({
        variant: "destructive",
        title: "Invalid Quiz Code",
        description: "Please enter a valid 6-digit code",
      });
      return;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please log in to join a quiz",
      });
      navigate('/login', { state: { returnUrl: `/join-quiz` } });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Check if quiz with this code exists
      const { data: quizData, error: quizError } = await supabase
        .from('quizzes')
        .select('id, status')
        .eq('code', quizCode)
        .single();
      
      if (quizError || !quizData) {
        toast({
          variant: "destructive",
          title: "Quiz Not Found",
          description: "The quiz code you entered doesn't exist or has expired.",
        });
        return;
      }
      
      if (quizData.status === 'archived') {
        toast({
          variant: "destructive",
          title: "Quiz Expired",
          description: "This quiz has ended and is no longer active.",
        });
        return;
      }
      
      // If quiz exists and is valid, navigate to lobby
      navigate(`/quiz-lobby/${quizCode}`);
    } catch (error) {
      console.error('Error joining quiz:', error);
      toast({
        variant: "destructive",
        title: "Error Joining Quiz",
        description: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <label htmlFor="quiz-code" className="block mb-2 text-sm font-medium">
          Enter 6-digit Quiz Code
        </label>
        <Input
          id="quiz-code"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="123456"
          value={quizCode}
          onChange={handleCodeChange}
          className="text-center text-2xl letter-spacing-wide font-mono"
          autoComplete="off"
        />
      </div>
      <Button 
        type="submit" 
        disabled={quizCode.length !== 6 || isLoading}
        className="w-full gradient-bg"
      >
        {isLoading ? "Joining..." : "Join Quiz"}
      </Button>
    </form>
  );
}
