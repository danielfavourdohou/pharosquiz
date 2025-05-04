
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
        // In a real implementation, we would fetch actual data from Supabase
        // For demo purposes, let's generate mock data
        
        // Mock stats
        setStats({
          hostedQuizzes: '3',
          participations: '8',
          earnings: '125 PHAR'
        });
        
        // Mock recent activity
        const mockActivity: QuizActivity[] = [
          {
            id: '1',
            title: 'Blockchain Basics',
            code: '123456',
            date: '2023-05-03',
            type: 'hosted',
            status: 'completed'
          },
          {
            id: '2',
            title: 'DeFi Explained',
            code: '234567',
            date: '2023-05-02',
            type: 'joined',
            status: 'completed',
            score: 850,
            position: 2
          },
          {
            id: '3',
            title: 'NFT Revolution',
            code: '345678',
            date: '2023-05-01',
            type: 'joined',
            status: 'completed',
            score: 920,
            position: 1
          },
          {
            id: '4',
            title: 'Web3 Security',
            code: '456789',
            date: '2023-04-28',
            type: 'hosted',
            status: 'draft'
          }
        ];
        
        setRecentActivity(mockActivity);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: "Failed to load user data",
          description: "Please try refreshing the page.",
          variant: "destructive"
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
