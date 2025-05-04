
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookMarked, Check, Plus, Users } from 'lucide-react';

interface QuizActivity {
  id: string;
  title: string;
  code: string;
  date: string;
  type: 'hosted' | 'joined';
  status: 'draft' | 'active' | 'completed' | 'archived';
  score?: number;
  position?: number;
}

interface RecentActivityProps {
  recentActivity: QuizActivity[];
  isLoading: boolean;
}

const RecentActivity = ({ recentActivity, isLoading }: RecentActivityProps) => {
  const navigate = useNavigate();

  return (
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
  );
};

export default RecentActivity;
