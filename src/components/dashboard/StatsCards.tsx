
import { BookOpen, History, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardsProps {
  stats: {
    hostedQuizzes: string;
    participations: string;
    earnings: string;
  };
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  const navigate = useNavigate();

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
    <>
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
    </>
  );
};

export default StatsCards;
