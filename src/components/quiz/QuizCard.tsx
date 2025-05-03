
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface QuizCardProps {
  id: string;
  title: string;
  description: string;
  questions: number;
  timePerQuestion: number;
  prizePool?: string;
  isActive?: boolean;
}

export default function QuizCard({
  id,
  title,
  description,
  questions,
  timePerQuestion,
  prizePool,
  isActive = false,
}: QuizCardProps) {
  return (
    <Card className="overflow-hidden border border-border hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="truncate">{title}</CardTitle>
          {isActive && <Badge className="gradient-bg">Active</Badge>}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 text-sm">
          <Badge variant="outline">{questions} Questions</Badge>
          <Badge variant="outline">{timePerQuestion}s per Question</Badge>
          {prizePool && <Badge variant="secondary">{prizePool} Prize Pool</Badge>}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Link 
          to={`/quiz/${id}`} 
          className="w-full"
        >
          <button 
            className="w-full bg-pharos-primary hover:bg-pharos-secondary text-white font-medium py-2 rounded-md transition-colors"
          >
            View Quiz
          </button>
        </Link>
      </CardFooter>
    </Card>
  );
}
