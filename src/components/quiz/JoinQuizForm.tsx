
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

export default function JoinQuizForm() {
  const [quizCode, setQuizCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (quizCode.length !== 6) {
      toast({
        variant: "destructive",
        title: "Invalid Quiz Code",
        description: "Please enter a valid 6-digit code",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Mock API call - in a real app, this would verify the code with the backend
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes, I'm just using a mock code "123456"
      if (quizCode === '123456') {
        navigate(`/quiz-lobby/${quizCode}`);
      } else {
        toast({
          variant: "destructive",
          title: "Quiz Not Found",
          description: "The quiz code you entered doesn't exist or has expired.",
        });
      }
    }, 1000);
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
