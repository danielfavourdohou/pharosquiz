
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Leaderboard, { Player } from '@/components/quiz/Leaderboard';
import { Button } from '@/components/ui/button';

const QuizResults = () => {
  const { quizCode } = useParams<{ quizCode: string }>();
  
  // Mock data - in a real app, this would come from your backend
  const quizData = {
    title: "Web3 Knowledge Quiz",
    hostName: "CryptoTeacher",
    totalQuestions: 10,
    timePerQuestion: 20,
    prizePool: "100 PHAR",
    createdAt: new Date().toISOString(),
  };
  
  // Mock players with final scores
  const players: Player[] = [
    { id: "3", name: "Blockchain_Fan", score: 820, rank: 1 },
    { id: "4", name: "Web3Wizard", score: 780, rank: 2 },
    { id: "2", name: "You", score: 750, rank: 3 }, // Current user
    { id: "1", name: "Player1", score: 680, rank: 4 },
    { id: "5", name: "Player5", score: 620, rank: 5 },
    { id: "6", name: "Player6", score: 540, rank: 6 },
    { id: "7", name: "Player7", score: 320, rank: 7 },
  ];
  
  // Transaction hashes for prize distributions (mock data)
  const prizeTxHashes = {
    first: "0x3a8d94e5e5a89d2d131d4987d38db49c1eb742eabc74a15883e54b9853b91a55",
    second: "0x8f267891a911e6ab7a302e4753daf088aa57127a3ba386d31b2a0e7d3b210424",
    third: "0x7c4ea6f2b1abcde63f358c2b1256a5a6f8942abc123ea4b7d8701ddc4e8b9f12",
  };
  
  // Current user for highlighting
  const currentUserId = "2";
  
  // Format transaction hash for display
  const formatTxHash = (hash: string) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Results Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">{quizData.title} - Results</h1>
            <p className="text-muted-foreground">
              Quiz code: <span className="font-mono font-semibold">{quizCode}</span> • 
              Hosted by {quizData.hostName}
            </p>
          </div>
          
          {/* Winners Podium */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Winners</h2>
            
            <div className="flex flex-col md:flex-row justify-center items-end gap-4 mb-8">
              {/* 2nd Place */}
              <div className="w-full md:w-1/4 order-2 md:order-1">
                <div className="bg-gray-100 h-24 rounded-t-lg flex flex-col items-center justify-end p-4 border-t-4 border-gray-400">
                  <div className="w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-2xl mb-2">
                    2
                  </div>
                </div>
                <div className="bg-card border rounded-b-lg p-4 text-center">
                  <p className="font-bold">{players[1].name}</p>
                  <p className="text-sm text-muted-foreground mb-1">{players[1].score} points</p>
                  <p className="text-xs bg-muted rounded-full px-2 py-1 inline-block">
                    30 PHAR
                  </p>
                </div>
              </div>
              
              {/* 1st Place */}
              <div className="w-full md:w-1/3 order-1 md:order-2">
                <div className="bg-yellow-100 h-32 rounded-t-lg flex flex-col items-center justify-end p-4 border-t-4 border-yellow-500">
                  <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-3xl mb-2">
                    1
                  </div>
                </div>
                <div className="bg-card border rounded-b-lg p-4 text-center">
                  <p className="font-bold text-lg">{players[0].name}</p>
                  <p className="text-muted-foreground mb-1">{players[0].score} points</p>
                  <p className="text-sm bg-yellow-100 text-yellow-800 rounded-full px-3 py-1 inline-block">
                    50 PHAR
                  </p>
                </div>
              </div>
              
              {/* 3rd Place */}
              <div className="w-full md:w-1/4 order-3 md:order-3">
                <div className="bg-amber-100 h-16 rounded-t-lg flex flex-col items-center justify-end p-4 border-t-4 border-amber-700">
                  <div className="w-16 h-16 rounded-full bg-amber-700 flex items-center justify-center text-white font-bold text-2xl mb-2">
                    3
                  </div>
                </div>
                <div className="bg-card border rounded-b-lg p-4 text-center">
                  <p className="font-bold">{players[2].name}</p>
                  <p className="text-sm text-muted-foreground mb-1">{players[2].score} points</p>
                  <p className="text-xs bg-muted rounded-full px-2 py-1 inline-block">
                    20 PHAR
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Prize Distribution Details */}
          <div className="bg-card border rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Prize Distribution</h2>
            
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{players[0].name} (1st Place)</p>
                  <p className="text-muted-foreground text-sm">50 PHAR</p>
                </div>
                <div className="mt-2 sm:mt-0">
                  <a 
                    href={`https://explorer.pharos.com/tx/${prizeTxHashes.first}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-pharos-primary hover:underline font-mono"
                  >
                    {formatTxHash(prizeTxHashes.first)}
                  </a>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{players[1].name} (2nd Place)</p>
                  <p className="text-muted-foreground text-sm">30 PHAR</p>
                </div>
                <div className="mt-2 sm:mt-0">
                  <a 
                    href={`https://explorer.pharos.com/tx/${prizeTxHashes.second}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-pharos-primary hover:underline font-mono"
                  >
                    {formatTxHash(prizeTxHashes.second)}
                  </a>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{players[2].name} (3rd Place)</p>
                  <p className="text-muted-foreground text-sm">20 PHAR</p>
                </div>
                <div className="mt-2 sm:mt-0">
                  <a 
                    href={`https://explorer.pharos.com/tx/${prizeTxHashes.third}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-pharos-primary hover:underline font-mono"
                  >
                    {formatTxHash(prizeTxHashes.third)}
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 border border-dashed rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">
                All transactions are recorded on the Pharos blockchain and can be verified by clicking the transaction hashes above.
              </p>
            </div>
          </div>
          
          {/* Full Leaderboard */}
          <div className="bg-card border rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Final Leaderboard</h2>
            <Leaderboard players={players} currentUserId={currentUserId} />
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/create-quiz">
              <Button variant="outline">Create New Quiz</Button>
            </Link>
            <Link to="/join-quiz">
              <Button className="gradient-bg">Join Another Quiz</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuizResults;
