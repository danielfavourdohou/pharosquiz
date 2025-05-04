
import { Plus, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const QuickActions = () => {
  const navigate = useNavigate();
  
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

  return (
    <>
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
    </>
  );
};

export default QuickActions;
