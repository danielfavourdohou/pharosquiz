
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import QuickActions from '@/components/dashboard/QuickActions';
import StatsCards from '@/components/dashboard/StatsCards';
import RecentActivity from '@/components/dashboard/RecentActivity';

interface QuizActivity {
  id: string;
  title: string;
  code: string;
  date: string;
  type: 'hosted' | 'joined';
  status: 'draft' | 'active' | 'completed' | 'archived'; // Added 'archived' to fix type error
  score?: number;
  position?: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [recentActivity, setRecentActivity] = useState<QuizActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'Quiz Master';

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
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome, {displayName}!</h1>
          <p className="text-muted-foreground mt-2">Manage your quizzes and see your latest activity.</p>
        </div>
        
        {/* Quick Action Cards */}
        <QuickActions />
        
        {/* Stats Cards */}
        <StatsCards stats={stats} />
        
        {/* Recent Activity */}
        <RecentActivity recentActivity={recentActivity} isLoading={isLoading} />
      </div>
    </Layout>
  );
}
