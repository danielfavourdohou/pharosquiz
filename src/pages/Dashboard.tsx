
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Plus, TrendingUp, History, Trophy, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [recentQuizzes, setRecentQuizzes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'Quiz Master';

  // Quick actions for the user
  const quickActions = [
    {
      title: 'Host a Quiz',
      description: 'Create a new quiz and invite participants',
      icon: <Plus className="h-10 w-10 text-pharos-primary" />,
      action: () => navigate('/create-quiz'),
      buttonText: 'Create Quiz',
      buttonVariant: 'default' as const,
      buttonClass: 'gradient-bg'
    },
    {
      title: 'Join a Quiz',
      description: 'Enter a 6-digit code to join an existing quiz',
      icon: <Users className="h-10 w-10 text-pharos-purple" />,
      action: () => navigate('/join-quiz'),
      buttonText: 'Join Quiz',
      buttonVariant: 'outline' as const,
      buttonClass: ''
    }
  ];

  // Stats cards
  const statsCards = [
    {
      title: 'My Quizzes',
      value: '0',
      description: 'Quizzes created',
      icon: <TrendingUp className="h-8 w-8 text-pharos-cyan" />,
      action: () => navigate('/my-quizzes')
    },
    {
      title: 'Participations',
      value: '0',
      description: 'Quizzes joined',
      icon: <History className="h-8 w-8 text-pharos-magenta" />,
      action: () => navigate('/history')
    },
    {
      title: 'Earnings',
      value: '0 PHAR',
      description: 'Total rewards earned',
      icon: <Trophy className="h-8 w-8 text-pharos-teal" />,
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
            <Card key={index} className="border border-border hover:border-pharos-primary/50 transition-colors">
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
            <Button variant="ghost" size="sm" onClick={() => navigate('/history')}>
              View All
            </Button>
          </div>
          
          <div className="bg-card border rounded-lg p-6 text-center">
            <p className="text-muted-foreground">No recent quiz activity. Ready to start?</p>
            <div className="mt-4 flex flex-col xs:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/create-quiz')} className="gradient-bg">
                <Plus className="h-4 w-4 mr-2" />
                Create Quiz
              </Button>
              <Button onClick={() => navigate('/join-quiz')} variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Join Quiz
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
