
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

interface Question {
  text: string;
  options: string[];
  correctOptionIndex: number;
}

const CreateQuiz = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Quiz form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [numQuestions, setNumQuestions] = useState('10');
  const [timePerQuestion, setTimePerQuestion] = useState('15');
  const [prizePool, setPrizePool] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Questions state (would be expanded in a real implementation)
  const [questions, setQuestions] = useState<Question[]>([
    {
      text: '',
      options: ['', '', '', ''],
      correctOptionIndex: 0
    }
  ]);
  
  // Handle quiz creation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title) {
      toast({
        variant: "destructive",
        title: "Missing Title",
        description: "Please enter a quiz title",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Mock API call for quiz creation
    setTimeout(() => {
      setIsLoading(false);
      
      // Generate a random 6-digit code
      const quizCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      toast({
        title: "Quiz Created Successfully",
        description: "Your quiz has been created and is ready to share.",
      });
      
      // Navigate to the lobby with the new quiz code
      navigate(`/quiz-lobby/${quizCode}`);
    }, 1500);
  };
  
  // Simple demo version that only manages the first question
  const updateQuestionText = (text: string) => {
    const newQuestions = [...questions];
    newQuestions[0] = { ...newQuestions[0], text };
    setQuestions(newQuestions);
  };
  
  const updateQuestionOption = (index: number, text: string) => {
    const newQuestions = [...questions];
    const newOptions = [...newQuestions[0].options];
    newOptions[index] = text;
    newQuestions[0] = { ...newQuestions[0], options: newOptions };
    setQuestions(newQuestions);
  };
  
  const updateCorrectAnswer = (index: number) => {
    const newQuestions = [...questions];
    newQuestions[0] = { ...newQuestions[0], correctOptionIndex: index };
    setQuestions(newQuestions);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Create a New Quiz</h1>
          
          <div className="bg-card border rounded-xl p-6 shadow-sm mb-8">
            <h2 className="text-xl font-medium mb-4">Quiz Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic quiz information */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block mb-2 text-sm font-medium">
                    Quiz Title
                  </label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Web3 Knowledge Test"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block mb-2 text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what your quiz is about..."
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="numQuestions" className="block mb-2 text-sm font-medium">
                      Number of Questions
                    </label>
                    <Select value={numQuestions} onValueChange={setNumQuestions}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 Questions</SelectItem>
                        <SelectItem value="10">10 Questions</SelectItem>
                        <SelectItem value="15">15 Questions</SelectItem>
                        <SelectItem value="20">20 Questions</SelectItem>
                        <SelectItem value="30">30 Questions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="timePerQuestion" className="block mb-2 text-sm font-medium">
                      Time per Question
                    </label>
                    <Select value={timePerQuestion} onValueChange={setTimePerQuestion}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 seconds</SelectItem>
                        <SelectItem value="20">20 seconds</SelectItem>
                        <SelectItem value="30">30 seconds</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="prizePool" className="block mb-2 text-sm font-medium">
                      Prize Pool (PHAR)
                    </label>
                    <Input
                      id="prizePool"
                      type="number"
                      min="0"
                      step="0.01"
                      value={prizePool}
                      onChange={(e) => setPrizePool(e.target.value)}
                      placeholder="e.g. 100"
                    />
                  </div>
                </div>
              </div>
              
              {/* Sample first question (in a real app, you'd add UI for multiple questions) */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Question 1</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="q1-text" className="block mb-2 text-sm font-medium">
                      Question Text
                    </label>
                    <Input
                      id="q1-text"
                      value={questions[0].text}
                      onChange={(e) => updateQuestionText(e.target.value)}
                      placeholder="Enter your question here..."
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block text-sm font-medium">
                      Answer Options
                    </label>
                    
                    {questions[0].options.map((option, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <input
                            type="radio"
                            id={`correct-${index}`}
                            name="correct-answer"
                            checked={questions[0].correctOptionIndex === index}
                            onChange={() => updateCorrectAnswer(index)}
                            className="mr-2"
                          />
                          <label htmlFor={`correct-${index}`} className="text-sm">
                            Correct
                          </label>
                        </div>
                        
                        <Input
                          value={option}
                          onChange={(e) => updateQuestionOption(index, e.target.value)}
                          placeholder={`Option ${String.fromCharCode(65 + index)}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Add more questions UI would go here in a real implementation */}
              <div className="text-center py-4 text-muted-foreground">
                <p>In a complete implementation, you would add UI to create all {numQuestions} questions.</p>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isLoading || !title} className="gradient-bg">
                  {isLoading ? "Creating..." : "Create Quiz"}
                </Button>
              </div>
            </form>
          </div>
          
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="font-semibold mb-3">Next Steps after Creation</h3>
            <ol className="space-y-2 text-sm list-decimal pl-4">
              <li className="text-muted-foreground">
                After creating your quiz, you'll be taken to a lobby page with a unique 6-digit code
              </li>
              <li className="text-muted-foreground">
                Share this code with participants so they can join your quiz
              </li>
              <li className="text-muted-foreground">
                When ready, you can start the quiz from the lobby page
              </li>
              <li className="text-muted-foreground">
                At the end of the quiz, the top 3 participants will automatically receive crypto prizes
              </li>
            </ol>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateQuiz;
