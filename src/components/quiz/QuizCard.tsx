
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface QuizCardProps {
  id: string;
  title: string;
  description: string;
  questions: number;
  timePerQuestion: number;
  prizePool?: string;
  isActive?: boolean;
  isParticipant?: boolean;
  code?: string;
}

export default function QuizCard({
  id,
  title,
  description,
  questions,
  timePerQuestion,
  prizePool,
  isActive = false,
  isParticipant = false,
  code
}: QuizCardProps) {
  const navigate = useNavigate();
  
  const handleCopyCode = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      toast("Code copied!", {
        description: "Share this code with participants to join your quiz."
      });
    }
  };
  
  return (
    <Card className="overflow-hidden border border-border hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="truncate">{title}</CardTitle>
          {isActive && <Badge className="bg-tealMist text-pharosNavy hover:bg-tealMist">Active</Badge>}
          {isParticipant && <Badge className="bg-magentaGlow text-white hover:bg-magentaGlow">Joined</Badge>}
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 text-sm">
          <Badge variant="outline">{questions} Questions</Badge>
          <Badge variant="outline">{timePerQuestion}s per Question</Badge>
          {prizePool && <Badge variant="secondary">{prizePool} Prize Pool</Badge>}
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex flex-col gap-2">
        {code && (
          <div className="flex justify-between items-center w-full bg-muted px-3 py-2 rounded-md mb-2">
            <div className="text-sm font-medium">Code: {code}</div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCopyCode}
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        <div className="w-full">
          <Button 
            onClick={() => navigate(`/quiz-lobby/${code}`)}
            className="w-full bg-neonCyan text-pharosNavy hover:bg-electricPurple hover:text-white"
          >
            {isActive ? 'Join Lobby' : 'View Quiz'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
