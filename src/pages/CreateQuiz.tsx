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
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import QuestionForm from '@/components/quiz/QuestionForm';
import { PlusCircle, Trash2, Check } from 'lucide-react';

interface Question {
  text: string;
  options: string[];
  correctOptionIndex: number;
}

const CreateQuiz = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Quiz form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [numQuestions, setNumQuestions] = useState('5');
  const [timePerQuestion, setTimePerQuestion] = useState('15');
  const [prizePool, setPrizePool] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0); // 0: Basic Info, 1: Questions
  
  // Initialize questions based on numQuestions
  const [questions, setQuestions] = useState<Question[]>([
    {
      text: '',
      options: ['', '', '', ''],
      correctOptionIndex: 0
    }
  ]);
  
  // Handle quiz creation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title) {
      toast("Missing Title", {
        description: "Please enter a quiz title"
      });
      return;
    }

    if (!user) {
      toast("Authentication Error", {
        description: "You must be logged in to create a quiz"
      });
      return;
    }

    // Validate all questions
    const invalidQuestions = questions.filter(
      (q, idx) => !q.text || q.options.some(option => !option)
    );
    
    if (invalidQuestions.length > 0) {
      toast("Incomplete Questions", {
        description: `Please complete all questions and options before submitting.`
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // We'll provide an empty code string that will be replaced by the trigger
      // Insert quiz into database
      const { data: quizData, error: quizError } = await supabase
        .from('quizzes')
        .insert({
          title,
          description: description || null,
          creator_id: user.id,
          time_per_question: parseInt(timePerQuestion),
          prize_pool: prizePool ? parseFloat(prizePool) : 0,
          status: 'draft',
          code: '' // Add empty code that will be replaced by the database trigger
        })
        .select('id, code')
        .single();
      
      if (quizError) {
        console.error('Error creating quiz:', quizError);
        toast("Error Creating Quiz", {
          description: quizError.message
        });
        return;
      }

      // Add all questions
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        
        const { data: questionData, error: questionError } = await supabase
          .from('questions')
          .insert({
            quiz_id: quizData.id,
            question_text: question.text,
            correct_option: question.correctOptionIndex,
            order_index: i,
          })
          .select('id')
          .single();
        
        if (questionError) {
          console.error(`Error creating question ${i + 1}:`, questionError);
          continue;
        }
        
        // Add options for each question
        const optionsToInsert = question.options.map((optionText, index) => ({
          question_id: questionData.id,
          option_text: optionText,
          option_index: index,
        }));
        
        await supabase.from('options').insert(optionsToInsert);
      }
      
      toast("Quiz Created Successfully", {
        description: "Your quiz has been created and is ready to share."
      });
      
      // Navigate to the lobby with the new quiz code
      navigate(`/quiz-lobby/${quizData.code}`);
    } catch (error) {
      console.error('Error creating quiz:', error);
      toast("Error Creating Quiz", {
        description: "An unexpected error occurred. Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddQuestion = () => {
    const currentCount = questions.length;
    const targetCount = parseInt(numQuestions);
    
    if (currentCount < targetCount) {
      setQuestions([
        ...questions,
        {
          text: '',
          options: ['', '', '', ''],
          correctOptionIndex: 0
        }
      ]);
    }
  };
  
  const handleRemoveQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };
  
  const updateQuestion = (index: number, updatedQuestion: Question) => {
    const newQuestions = [...questions];
    newQuestions[index] = updatedQuestion;
    setQuestions(newQuestions);
  };

  const handleNumQuestionsChange = (value: string) => {
    setNumQuestions(value);
    const numQuestionsInt = parseInt(value);
    
    // Adjust questions array based on new count
    if (numQuestionsInt > questions.length) {
      // Add more empty questions
      const newQuestions = [...questions];
      for (let i = questions.length; i < numQuestionsInt; i++) {
        newQuestions.push({
          text: '',
          options: ['', '', '', ''],
          correctOptionIndex: 0
        });
      }
      setQuestions(newQuestions);
    } else if (numQuestionsInt < questions.length) {
      // Remove excess questions
      setQuestions(questions.slice(0, numQuestionsInt));
    }
  };
  
  const moveToQuestions = () => {
    if (!title) {
      toast("Missing Title", {
        description: "Please enter a quiz title before proceeding"
      });
      return;
    }
    setActiveStep(1);
  };

  const moveToBasicInfo = () => {
    setActiveStep(0);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Create a New Quiz</h1>
          
          {/* Steps Indicator */}
          <div className="flex mb-8">
            <div 
              className={`flex-1 pb-2 cursor-pointer ${activeStep === 0 ? 'border-b-2 border-neonCyan text-neonCyan' : 'border-b border-gray-300 text-gray-500'}`}
              onClick={moveToBasicInfo}
            >
              <div className="flex items-center">
                <span className={`w-8 h-8 rounded-full ${activeStep === 0 ? 'bg-neonCyan text-pharosNavy' : 'bg-gray-300 text-gray-700'} flex items-center justify-center mr-2`}>1</span>
                <span className="font-medium">Quiz Details</span>
              </div>
            </div>
            
            <div 
              className={`flex-1 pb-2 cursor-pointer ${activeStep === 1 ? 'border-b-2 border-neonCyan text-neonCyan' : 'border-b border-gray-300 text-gray-500'}`}
              onClick={title ? moveToQuestions : undefined}
            >
              <div className="flex items-center">
                <span className={`w-8 h-8 rounded-full ${activeStep === 1 ? 'bg-neonCyan text-pharosNavy' : 'bg-gray-300 text-gray-700'} flex items-center justify-center mr-2`}>2</span>
                <span className="font-medium">Questions</span>
              </div>
            </div>
          </div>
          
          <div className="bg-card border rounded-xl p-6 shadow-sm mb-8">
            {activeStep === 0 ? (
              /* Step 1: Basic Quiz Information */
              <div className="space-y-4">
                <h2 className="text-xl font-medium mb-4">Quiz Details</h2>
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
                    <Select value={numQuestions} onValueChange={handleNumQuestionsChange}>
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
                
                <div className="flex justify-end pt-4">
                  <Button 
                    onClick={moveToQuestions} 
                    className="bg-neonCyan text-pharosNavy hover:bg-electricPurple hover:text-white"
                    disabled={!title}
                  >
                    Next: Create Questions
                  </Button>
                </div>
              </div>
            ) : (
              /* Step 2: Questions Creation */
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-xl font-medium mb-4">Create Questions</h2>
                <div className="space-y-6">
                  {questions.map((question, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Question {index + 1}</h3>
                        {questions.length > 1 && (
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleRemoveQuestion(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        )}
                      </div>
                      
                      <QuestionForm
                        question={question}
                        onChange={(updatedQuestion) => updateQuestion(index, updatedQuestion)}
                      />
                    </div>
                  ))}
                </div>
                
                {questions.length < parseInt(numQuestions) && (
                  <div className="flex justify-center">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleAddQuestion}
                      className="w-full max-w-md"
                    >
                      <PlusCircle className="h-5 w-5 mr-2" />
                      Add Question
                    </Button>
                  </div>
                )}
                
                <div className="flex justify-between pt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={moveToBasicInfo}
                  >
                    Back to Quiz Details
                  </Button>
                  
                  <Button 
                    type="submit" 
                    disabled={isLoading} 
                    className="bg-neonCyan text-pharosNavy hover:bg-electricPurple hover:text-white"
                  >
                    {isLoading ? "Creating..." : "Create Quiz"}
                  </Button>
                </div>
              </form>
            )}
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
