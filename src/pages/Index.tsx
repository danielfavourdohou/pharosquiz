
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import JoinQuizForm from '@/components/quiz/JoinQuizForm';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-pharos-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-pharos-secondary/20 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in gradient-text">
            Live Quiz Competitions with Crypto Rewards
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8 animate-fade-in">
            Create thrilling quiz competitions, participate in real-time challenges, and win cryptocurrency prizes on the Pharos blockchain.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <Link to="/create-quiz">
              <Button size="lg" className="gradient-bg">Create Quiz</Button>
            </Link>
            <Link to="/join-quiz">
              <Button size="lg" variant="outline">Join Quiz</Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Join Quiz Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Ready to Compete?</h2>
              <p className="text-muted-foreground mb-6">
                Enter the 6-digit quiz code provided by the host to join an active quiz session.
              </p>
              <div className="p-6 bg-white shadow-lg rounded-xl border">
                <JoinQuizForm />
              </div>
            </div>
            
            <div className="md:w-1/2 space-y-6">
              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="font-semibold mb-2 text-lg">Real-time Competition</h3>
                <p className="text-muted-foreground">Compete with other participants and answer questions quickly for higher scores.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="font-semibold mb-2 text-lg">Live Leaderboard</h3>
                <p className="text-muted-foreground">Track your position on the leaderboard as the quiz progresses.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="font-semibold mb-2 text-lg">Win Crypto Prizes</h3>
                <p className="text-muted-foreground">Top performers automatically receive cryptocurrency rewards through smart contracts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How PharosQuiz Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform makes it easy to create, join, and win in blockchain-powered quiz competitions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border bg-card flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-pharos-primary flex items-center justify-center text-white font-bold text-lg mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Create & Fund Quiz</h3>
              <p className="text-muted-foreground">
                Define questions, set time limits, and fund the prize pool with cryptocurrency.
              </p>
            </div>
            
            <div className="p-6 rounded-xl border bg-card flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-pharos-primary flex items-center justify-center text-white font-bold text-lg mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Compete in Real-time</h3>
              <p className="text-muted-foreground">
                Join using a code, answer timed questions, and watch the live leaderboard.
              </p>
            </div>
            
            <div className="p-6 rounded-xl border bg-card flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-pharos-primary flex items-center justify-center text-white font-bold text-lg mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Win & Verify Rewards</h3>
              <p className="text-muted-foreground">
                Top performers receive crypto prizes automatically with transparent blockchain verification.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="gradient-bg py-16 md:py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Host Your First Quiz?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Create engaging quizzes, reward participants, and build your community on the Pharos blockchain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="bg-white text-pharos-primary hover:bg-gray-100">
                Sign Up Free
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
