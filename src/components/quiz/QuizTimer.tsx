
import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

interface QuizTimerProps {
  duration: number;
  onTimeUp: () => void;
}

export default function QuizTimer({ duration, onTimeUp }: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [progress, setProgress] = useState(100);
  
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        setProgress((newTime / duration) * 100);
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, duration, onTimeUp]);
  
  // Determine the color based on progress
  const getProgressColor = () => {
    if (progress < 30) return 'bg-destructive';
    if (progress < 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Time Left</span>
        <span className="text-lg font-bold">{timeLeft}s</span>
      </div>
      <Progress 
        value={progress} 
        className="h-2"
        indicatorClassName={getProgressColor()}
      />
    </div>
  );
}
