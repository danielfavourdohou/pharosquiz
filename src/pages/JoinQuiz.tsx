
import Layout from '@/components/layout/Layout';
import JoinQuizForm from '@/components/quiz/JoinQuizForm';

const JoinQuiz = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Join a Quiz</h1>
            <p className="text-muted-foreground">
              Enter the 6-digit code provided by the quiz host to join an ongoing session.
            </p>
          </div>

          <div className="bg-card border rounded-xl p-8 shadow-sm">
            <JoinQuizForm />
          </div>

          <div className="mt-8 p-6 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-3">How to Join a Quiz</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span>1.</span>
                <span>Ask the quiz host for their unique 6-digit quiz code</span>
              </li>
              <li className="flex gap-2">
                <span>2.</span>
                <span>Enter the code in the form above</span>
              </li>
              <li className="flex gap-2">
                <span>3.</span>
                <span>Wait in the lobby until the host starts the quiz</span>
              </li>
              <li className="flex gap-2">
                <span>4.</span>
                <span>Answer questions quickly for higher scores</span>
              </li>
              <li className="flex gap-2">
                <span>5.</span>
                <span>Top 3 players will receive crypto prizes automatically</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JoinQuiz;
