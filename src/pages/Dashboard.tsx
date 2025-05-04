
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Plus, TrendingUp, History, Trophy, Users, BookOpen, Check, BookMarked } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface QuizActivity {
  id: string;
  title: string;
  code: string;
  date: string;
  type: 'hosted' | 'joined';
  status: 'draft' | 'active' | 'completed';
  score?: number;
  position?: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recentActivity, setRecentActivity] = useState<QuizActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'Quiz Master';

  // Quick actions for the user
  const quickActions = [
    {
      title: 'Host a Quiz',
      description: 'Create a new quiz and invite participants',
      icon: <Plus className="h-10 w-10 text-neonCyan" />,
      action: () => navigate('/create-quiz'),
      buttonText: 'Create Quiz',
      buttonVariant: 'default' as const,
      buttonClass: 'bg-neonCyan text-pharosNavy hover:bg-electricPurple hover:text-white'
    },
    {
      title: 'Join a Quiz',
      description: 'Enter a 6-digit code to join an existing quiz',
      icon: <Users className="h-10 w-10 text-magentaGlow" />,
      action: () => navigate('/join-quiz'),
      buttonText: 'Join Quiz',
      buttonVariant: 'outline' as const,
      buttonClass: ''
    }
  ];

  // Stats cards
  const [stats, setStats] = useState({
    hostedQuizzes: '0',
    participations: '0',
    earnings: '0 PHAR',
  });
  
  // Fetch user data and activity
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        // Fetch user's hosted quizzes count
        const { data: hostedQuizzes, error: hostedError } = await supabase
          .from('quizzes')
          .select('id')
          .eq('creator_id', user.id);
          
        if (hostedError) throw hostedError;
        
        // Fetch user's participations count
        const { data: participations, error: participationsError } = await supabase
          .from('participants')
          .select('id, score')
          .eq('user_id', user.id);
          
        if (participationsError) throw participationsError;
        
        // Fetch user's rewards (earnings)
        const { data: rewards, error: rewardsError } = await supabase
          .from('rewards')
          .select('amount, token_type')
          .eq('participant_id', user.id);
          
        if (rewardsError) throw rewardsError;
        
        // Calculate total earnings
        const totalEarnings = rewards?.reduce((sum, reward) => sum + Number(reward.amount), 0) || 0;
        
        // Update stats
        setStats({
          hostedQuizzes: String(hostedQuizzes?.length || 0),
          participations: String(participations?.length || 0),
          earnings: `${totalEarnings} PHAR`,
        });
        
        // Fetch recent activity - combining hosted and joined quizzes
        // First, get hosted quizzes
        const { data: createdQuizzes, error: createdError } = await supabase
          .from('quizzes')
          .select('id, title, code, created_at, status')
          .eq('creator_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);
          
        if (createdError) throw createdError;
        
        // Then, get joined quizzes with participation data
        const { data: joinedQuizzes, error: joinedError } = await supabase
          .from('participants')
          .select(`
            id, 
            score, 
            completed_at,
            joined_at,
            quiz_id,
            quizzes (
              id, 
              title, 
              code, 
              status
            )
          `)
          .eq('user_id', user.id)
          .order('joined_at', { ascending: false })
          .limit(5);
          
        if (joinedError) throw joinedError;
        
        // Format hosted quizzes for the activity feed
        const hostedActivity: QuizActivity[] = createdQuizzes.map(quiz => ({
          id: quiz.id,
          title: quiz.title,
          code: quiz.code,
          date: new Date(quiz.created_at).toISOString().split('T')[0],
          type: 'hosted',
          status: quiz.status,
        }));
        
        // Format joined quizzes for the activity feed
        const joinedActivity: QuizActivity[] = joinedQuizzes.map(participation => {
          if (!participation.quizzes) return null;
          
          return {
            id: participation.quiz_id,
            title: participation.quizzes.title,
            code: participation.quizzes.code,
            date: new Date(participation.joined_at).toISOString().split('T')[0],
            type: 'joined',
            status: participation.quizzes.status,
            score: participation.score,
            // We'll need to calculate position based on leaderboard data
            position: undefined, // This would require additional queries to determine
          };
        }).filter(Boolean) as QuizActivity[];
        
        // Combine and sort activity by date (most recent first)
        const combinedActivity = [...hostedActivity, ...joinedActivity]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5); // Limit to the 5 most recent activities
        
        setRecentActivity(combinedActivity);
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: "Failed to load user data",
          description: "Please try refreshing the page."
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [user]);

  // Stats cards with real data
  const statsCards = [
    {
      title: 'My Quizzes',
      value: stats.hostedQuizzes,
      description: 'Quizzes created',
      icon: <BookOpen className="h-8 w-8 text-neonCyan" />,
      action: () => navigate('/my-quizzes')
    },
    {
      title: 'Participations',
      value: stats.participations,
      description: 'Quizzes joined',
      icon: <History className="h-8 w-8 text-magentaGlow" />,
      action: () => navigate('/history')
    },
    {
      title: 'Earnings',
      value: stats.earnings,
      description: 'Total rewards earned',
      icon: <Trophy className="h-8 w-8 text-tealMist" />,
      action: () => navigate('/rewards')
    }
  ];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome, {displayName}!</h1>
          <p className="text-muted-foreground mt-2">Manage your quizzes and see your latest activity.</p>
        </div>
        
        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {quickActions.map((action, index) => (
            <Card key={index} className="border border-border hover:border-neonCyan/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>{action.title}</CardTitle>
                  <CardDescription className="mt-1">{action.description}</CardDescription>
                </div>
                <div className="p-2">{action.icon}</div>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button 
                  onClick={action.action} 
                  variant={action.buttonVariant}
                  className={action.buttonClass}
                  size="lg"
                >
                  {action.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Stats Cards */}
        <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {statsCards.map((stat, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-md transition-shadow border border-border"
              onClick={stat.action}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                  </div>
                  <div>{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Recent Activity */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/my-quizzes')}
              className="text-neonCyan hover:text-neonCyan/80"
            >
              View All
            </Button>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neonCyan mx-auto mb-4"></div>
              <p>Loading your activity...</p>
            </div>
          ) : recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <Card 
                  key={index} 
                  className="cursor-pointer hover:border-neonCyan/50 transition-all"
                  onClick={() => {
                    if (activity.status === 'draft' || activity.status === 'active') {
                      navigate(`/quiz-lobby/${activity.code}`);
                    } else {
                      navigate(`/quiz-results/${activity.code}`);
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{activity.title}</h3>
                          <Badge className={activity.type === 'hosted' ? 'bg-electricPurple' : 'bg-magentaGlow'}>
                            {activity.type === 'hosted' ? 'Hosted' : 'Joined'}
                          </Badge>
                          {activity.status === 'draft' && (
                            <Badge variant="outline">Draft</Badge>
                          )}
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          {activity.date} • Code: {activity.code}
                        </div>
                        
                        {activity.type === 'joined' && activity.status === 'completed' && (
                          <div className="flex items-center mt-2">
                            <span className="text-sm font-medium mr-3">
                              {activity.score} points
                            </span>
                            {activity.position === 1 && (
                              <Badge className="bg-yellow-500">1st Place</Badge>
                            )}
                            {activity.position === 2 && (
                              <Badge className="bg-gray-400">2nd Place</Badge>
                            )}
                            {activity.position === 3 && (
                              <Badge className="bg-amber-700">3rd Place</Badge>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        {activity.type === 'hosted' ? (
                          <BookMarked className="h-5 w-5 text-electricPurple" />
                        ) : activity.status === 'completed' ? (
                          <Check className="h-5 w-5 text-tealMist" />
                        ) : (
                          <Users className="h-5 w-5 text-magentaGlow" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-card border rounded-lg p-6 text-center">
              <p className="text-muted-foreground">No recent quiz activity. Ready to start?</p>
              <div className="mt-4 flex flex-col xs:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/create-quiz')} 
                  className="bg-neonCyan text-pharosNavy hover:bg-electricPurple hover:text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Quiz
                </Button>
                <Button onClick={() => navigate('/join-quiz')} variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Join Quiz
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
