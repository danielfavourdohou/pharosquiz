
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import Leaderboard, { Player } from '@/components/quiz/Leaderboard';
import { useToast } from '@/components/ui/use-toast';

const QuizLobby = () => {
  const { quizCode } = useParams<{ quizCode: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quizData, setQuizData] = useState({
    title: "Web3 Knowledge Quiz",
    hostName: "CryptoTeacher",
    questions: 10,
    timePerQuestion: 20,
    prizePool: "100 PHAR"
  });
  const [players, setPlayers] = useState<Player[]>([
    { id: "1", name: "Player1", score: 0 },
    { id: "2", name: "You", score: 0 },
    { id: "3", name: "Blockchain_Fan", score: 0 },
    { id: "4", name: "Web3Wizard", score: 0 },
  ]);
  const [isStarting, setIsStarting] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  
  // Set the current user for highlighting in the leaderboard
  const currentUserId = "2"; // For demo purposes
  
  // Mock a player joining effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (players.length < 10) {
        const newPlayer = {
          id: `player-${players.length + 1}`,
          name: `Player${players.length + 5}`,
          score: 0
        };
        
        setPlayers(prev => [...prev, newPlayer]);
        
        toast({
          title: "New Player Joined",
          description: `${newPlayer.name} has joined the quiz`,
        });
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [players, toast]);
  
  // Mock starting the quiz
  const startQuiz = () => {
    setIsStarting(true);
    setCountdown(5);
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev === null) return null;
        if (prev <= 1) {
          clearInterval(timer);
          navigate(`/play-quiz/${quizCode}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Quiz Info */}
          <div className="bg-card border rounded-xl p-6 mb-8">
            <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-bold">{quizData.title}</h1>
                <p className="text-muted-foreground">Hosted by {quizData.hostName}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="bg-muted px-3 py-1 rounded-full text-sm">
                  Code: <span className="font-mono font-bold">{quizCode}</span>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(`Join my PharosQuiz with code: ${quizCode}`);
                    toast({
                      title: "Code Copied!",
                      description: "Share this code with your friends to join.",
                    });
                  }}
                >
                  Share
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-muted p-3 rounded-md text-center">
                <div className="text-sm text-muted-foreground">Questions</div>
                <div className="font-bold">{quizData.questions}</div>
              </div>
              <div className="bg-muted p-3 rounded-md text-center">
                <div className="text-sm text-muted-foreground">Time/Question</div>
                <div className="font-bold">{quizData.timePerQuestion}s</div>
              </div>
              <div className="bg-muted p-3 rounded-md text-center">
                <div className="text-sm text-muted-foreground">Prize Pool</div>
                <div className="font-bold">{quizData.prizePool}</div>
              </div>
            </div>
            
            {isStarting ? (
              <div className="text-center p-8">
                <div className="text-2xl font-bold mb-2">Quiz Starting in:</div>
                <div className="text-5xl font-bold mb-4 animate-pulse-scale">{countdown}</div>
                <p className="text-muted-foreground">Get ready to answer questions!</p>
              </div>
            ) : (
              <div className="flex justify-center">
                <Button onClick={startQuiz} className="gradient-bg">
                  Start Quiz
                </Button>
              </div>
            )}
          </div>
          
          {/* Lobby */}
          <div className="bg-card border rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Lobby</h2>
              <div>
                <span className="text-muted-foreground mr-1">Players:</span>
                <span className="font-semibold">{players.length}</span>
              </div>
            </div>
            
            <Leaderboard players={players} currentUserId={currentUserId} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuizLobby;
