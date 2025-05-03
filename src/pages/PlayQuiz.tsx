
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import QuizTimer from '@/components/quiz/QuizTimer';
import Leaderboard, { Player } from '@/components/quiz/Leaderboard';
import { Card } from '@/components/ui/card';

// Define question interface
interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
}

// Mock questions data
const mockQuestions: Question[] = [
  {
    id: "q1",
    text: "What is the main advantage of a blockchain?",
    options: [
      "Centralized control",
      "Decentralized and distributed ledger",
      "Single point of failure",
      "Slow transaction speed"
    ],
    correctOptionIndex: 1
  },
  {
    id: "q2",
    text: "What is a smart contract?",
    options: [
      "A legal document",
      "A physical contract that looks modern",
      "Self-executing code on the blockchain",
      "An agreement between two smart people"
    ],
    correctOptionIndex: 2
  },
  {
    id: "q3",
    text: "What is the Pharos blockchain?",
    options: [
      "A programming language",
      "An EVM-compatible blockchain",
      "A cryptocurrency exchange",
      "A type of digital wallet"
    ],
    correctOptionIndex: 1
  },
  // More questions would go here
];

const PlayQuiz = () => {
  const { quizCode } = useParams<{ quizCode: string }>();
  const navigate = useNavigate();
  
  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timePerQuestion] = useState(20); // seconds
  const [showAnswer, setShowAnswer] = useState(false);
  const [players, setPlayers] = useState<Player[]>([
    { id: "1", name: "Player1", score: 120 },
    { id: "2", name: "You", score: 150 },
    { id: "3", name: "Blockchain_Fan", score: 180 },
    { id: "4", name: "Web3Wizard", score: 200 },
    { id: "5", name: "Player5", score: 90 },
    { id: "6", name: "Player6", score: 70 },
    { id: "7", name: "Player7", score: 50 },
  ]);
  
  // Current user ID for leaderboard highlighting
  const currentUserId = "2"; // For demo purposes
  
  // Current question from the array
  const currentQuestion = mockQuestions[currentQuestionIndex];
  
  // Handle option selection
  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null || showAnswer) return; // Prevent selecting after choice is made
    
    setSelectedOption(optionIndex);
    
    // Check if answer is correct
    if (optionIndex === currentQuestion.correctOptionIndex) {
      // Score based on how quickly they answered (simple demo calculation)
      const pointsEarned = 100;
      setScore(prevScore => prevScore + pointsEarned);
      
      // Update player score in leaderboard
      setPlayers(prevPlayers => 
        prevPlayers.map(player => 
          player.id === currentUserId 
            ? { ...player, score: player.score + pointsEarned } 
            : player
        )
      );
    }
    
    // Show the correct answer for a brief period
    setShowAnswer(true);
    
    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < mockQuestions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedOption(null);
        setShowAnswer(false);
      } else {
        // End of quiz
        navigate(`/quiz-results/${quizCode}`);
      }
    }, 2000);
  };
  
  // Handle time up - auto move to next question
  const handleTimeUp = () => {
    if (selectedOption === null) {
      setShowAnswer(true);
      
      // Move to next question after delay
      setTimeout(() => {
        if (currentQuestionIndex < mockQuestions.length - 1) {
          setCurrentQuestionIndex(prevIndex => prevIndex + 1);
          setSelectedOption(null);
          setShowAnswer(false);
        } else {
          // End of quiz
          navigate(`/quiz-results/${quizCode}`);
        }
      }, 2000);
    }
  };
  
  // Random updates to leaderboard to simulate other players
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers(prevPlayers => {
        return prevPlayers.map(player => {
          if (player.id !== currentUserId) {
            const scoreChange = Math.floor(Math.random() * 30);
            return { ...player, score: player.score + scoreChange };
          }
          return player;
        });
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentUserId]);
  
  // Apply opacity pulsing effect to options when time is low
  const isTimeRunningOut = false; // You can update this based on the timer
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Quiz Area */}
          <div className="lg:col-span-2">
            {/* Quiz Header */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Question {currentQuestionIndex + 1} of {mockQuestions.length}</h1>
                <div className="font-bold">Score: {score}</div>
              </div>
              
              <QuizTimer duration={timePerQuestion} onTimeUp={handleTimeUp} />
            </div>
            
            {/* Question */}
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">{currentQuestion.text}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    className={`p-4 rounded-lg text-left transition-all ${
                      selectedOption === index 
                        ? 'border-2 border-pharos-primary' 
                        : 'border border-border'
                    } ${
                      showAnswer
                        ? index === currentQuestion.correctOptionIndex
                          ? 'bg-green-100 border-green-500'
                          : selectedOption === index
                            ? 'bg-red-100 border-red-500'
                            : 'bg-card'
                        : 'bg-card hover:border-pharos-primary'
                    } ${
                      isTimeRunningOut && !selectedOption ? 'animate-pulse-scale' : ''
                    }`}
                    onClick={() => handleOptionSelect(index)}
                    disabled={selectedOption !== null || showAnswer}
                  >
                    <div className="font-medium flex gap-2 items-center">
                      <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm">
                        {String.fromCharCode(65 + index)} {/* A, B, C, D */}
                      </span>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
            
            {/* Feedback Area */}
            {showAnswer && (
              <div className={`p-4 rounded-lg text-center ${
                selectedOption === currentQuestion.correctOptionIndex
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                <p className="font-medium">
                  {selectedOption === currentQuestion.correctOptionIndex
                    ? '✓ Correct Answer!'
                    : `✗ Incorrect. The correct answer is ${String.fromCharCode(65 + currentQuestion.correctOptionIndex)}`}
                </p>
              </div>
            )}
          </div>
          
          {/* Leaderboard Sidebar */}
          <div className="bg-card border rounded-xl p-6">
            <Leaderboard players={players} currentUserId={currentUserId} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlayQuiz;
