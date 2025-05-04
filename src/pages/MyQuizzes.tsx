
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QuizCard from '@/components/quiz/QuizCard';
import { toast } from '@/components/ui/sonner';
import { BookOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Quiz {
  id: string;
  title: string;
  description: string;
  code: string;
  created_at: string;
  status: 'draft' | 'active' | 'completed' | 'archived';
  time_per_question: number;
  prize_pool: number;
  question_count?: number;
}

const MyQuizzes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [activeQuizzes, setActiveQuizzes] = useState<Quiz[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!user) return;

      setIsLoading(true);
      try {
        // Fetch quizzes created by the user
        const { data: quizzesData, error: quizzesError } = await supabase
          .from('quizzes')
          .select('*')
          .eq('creator_id', user.id)
          .order('created_at', { ascending: false });

        if (quizzesError) throw quizzesError;

        // Fetch question count for each quiz
        if (quizzesData) {
          const quizzesWithQuestionCount = await Promise.all(
            quizzesData.map(async (quiz) => {
              const { count, error } = await supabase
                .from('questions')
                .select('*', { count: 'exact', head: true })
                .eq('quiz_id', quiz.id);
                
              return {
                ...quiz,
                question_count: count || 0
              };
            })
          );

          setQuizzes(quizzesWithQuestionCount);
          setActiveQuizzes(quizzesWithQuestionCount.filter(q => 
            q.status === 'draft' || q.status === 'active'));
          setCompletedQuizzes(quizzesWithQuestionCount.filter(q => 
            q.status === 'completed' || q.status === 'archived'));
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        toast({
          title: "Failed to load quizzes",
          description: "Please try refreshing the page.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizzes();
  }, [user]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Quizzes</h1>
            <p className="text-muted-foreground mt-2">
              Manage quizzes you've created
            </p>
          </div>
          <Button 
            onClick={() => navigate('/create-quiz')}
            className="mt-4 md:mt-0 bg-neonCyan text-pharosNavy hover:bg-electricPurple hover:text-white"
          >
            <Plus className="mr-2 h-4 w-4" /> Create New Quiz
          </Button>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="active">Active Quizzes</TabsTrigger>
            <TabsTrigger value="completed">Completed Quizzes</TabsTrigger>
            <TabsTrigger value="all">All Quizzes</TabsTrigger>
          </TabsList>
          
          {/* Active Quizzes Tab */}
          <TabsContent value="active" className="space-y-4">
            {isLoading ? (
              <div className="text-center py-12">Loading your active quizzes...</div>
            ) : activeQuizzes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeQuizzes.map((quiz) => (
                  <QuizCard 
                    key={quiz.id}
                    id={quiz.id}
                    title={quiz.title}
                    description={quiz.description || 'No description provided'}
                    questions={quiz.question_count || 0}
                    timePerQuestion={quiz.time_per_question}
                    prizePool={quiz.prize_pool ? `${quiz.prize_pool} PHAR` : undefined}
                    isActive={quiz.status === 'active'}
                    code={quiz.code}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No Active Quizzes</h3>
                <p className="text-muted-foreground mb-6">You haven't created any active quizzes yet.</p>
                <Button 
                  onClick={() => navigate('/create-quiz')}
                  className="bg-neonCyan text-pharosNavy hover:bg-electricPurple hover:text-white"
                >
                  Create Your First Quiz
                </Button>
              </div>
            )}
          </TabsContent>
          
          {/* Completed Quizzes Tab */}
          <TabsContent value="completed" className="space-y-4">
            {isLoading ? (
              <div className="text-center py-12">Loading your completed quizzes...</div>
            ) : completedQuizzes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedQuizzes.map((quiz) => (
                  <QuizCard 
                    key={quiz.id}
                    id={quiz.id}
                    title={quiz.title}
                    description={quiz.description || 'No description provided'}
                    questions={quiz.question_count || 0}
                    timePerQuestion={quiz.time_per_question}
                    prizePool={quiz.prize_pool ? `${quiz.prize_pool} PHAR` : undefined}
                    isActive={false}
                    code={quiz.code}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No Completed Quizzes</h3>
                <p className="text-muted-foreground">
                  You haven't completed any quizzes yet.
                </p>
              </div>
            )}
          </TabsContent>
          
          {/* All Quizzes Tab */}
          <TabsContent value="all" className="space-y-4">
            {isLoading ? (
              <div className="text-center py-12">Loading your quizzes...</div>
            ) : quizzes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.map((quiz) => (
                  <QuizCard 
                    key={quiz.id}
                    id={quiz.id}
                    title={quiz.title}
                    description={quiz.description || 'No description provided'}
                    questions={quiz.question_count || 0}
                    timePerQuestion={quiz.time_per_question}
                    prizePool={quiz.prize_pool ? `${quiz.prize_pool} PHAR` : undefined}
                    isActive={quiz.status === 'active'}
                    code={quiz.code}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No Quizzes</h3>
                <p className="text-muted-foreground mb-6">You haven't created any quizzes yet.</p>
                <Button 
                  onClick={() => navigate('/create-quiz')}
                  className="bg-neonCyan text-pharosNavy hover:bg-electricPurple hover:text-white"
                >
                  Create Your First Quiz
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MyQuizzes;
