
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Player } from '@/components/quiz/Leaderboard';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { Trophy, Medal, Award, Clock } from 'lucide-react';

interface ExtendedPlayer extends Player {
  rank: number;
  quizzesTaken?: number;
  quizzesWon?: number;
  lastActive?: string;
  avatarUrl?: string;
}

interface QuizResult {
  quiz_title: string;
  quiz_date: string;
  player_name: string;
  score: number;
  position: number;
  prize?: string;
}

const LeaderboardPage = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [topPlayers, setTopPlayers] = useState<ExtendedPlayer[]>([]);
  const [monthlyLeaders, setMonthlyLeaders] = useState<ExtendedPlayer[]>([]);
  const [recentResults, setRecentResults] = useState<QuizResult[]>([]);
  
  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, we would fetch this data from Supabase
        // For demo purposes, we're generating mock data
        
        // Mock all-time top players data
        const mockTopPlayers: ExtendedPlayer[] = [
          {
            id: '1',
            name: 'CryptoWizard',
            score: 18750,
            rank: 1,
            quizzesTaken: 45,
            quizzesWon: 12,
            lastActive: '2023-05-01'
          },
          {
            id: '2',
            name: 'BlockchainNinja',
            score: 15320,
            rank: 2,
            quizzesTaken: 38,
            quizzesWon: 10,
            lastActive: '2023-05-03'
          },
          {
            id: '3',
            name: 'EtherQueen',
            score: 14250,
            rank: 3,
            quizzesTaken: 32,
            quizzesWon: 9,
            lastActive: '2023-05-02'
          },
          {
            id: '4',
            name: 'TokenMaster',
            score: 12180,
            rank: 4,
            quizzesTaken: 29,
            quizzesWon: 7,
            lastActive: '2023-05-01'
          },
          {
            id: '5',
            name: 'SatoshiFan',
            score: 10950,
            rank: 5,
            quizzesTaken: 25,
            quizzesWon: 5,
            lastActive: '2023-05-03'
          },
          {
            id: '6',
            name: 'NFTcollector',
            score: 9840,
            rank: 6,
            quizzesTaken: 22,
            quizzesWon: 4,
            lastActive: '2023-05-02'
          },
          {
            id: '7',
            name: 'DeFiGuru',
            score: 8760,
            rank: 7,
            quizzesTaken: 20,
            quizzesWon: 3,
            lastActive: '2023-05-01'
          },
          {
            id: '8',
            name: 'MetaMasker',
            score: 7830,
            rank: 8,
            quizzesTaken: 18,
            quizzesWon: 2,
            lastActive: '2023-05-02'
          },
          {
            id: '9',
            name: 'AltcoinHunter',
            score: 6920,
            rank: 9,
            quizzesTaken: 15,
            quizzesWon: 2,
            lastActive: '2023-05-03'
          },
          {
            id: '10',
            name: 'DAOvoter',
            score: 6120,
            rank: 10,
            quizzesTaken: 14,
            quizzesWon: 1,
            lastActive: '2023-05-01'
          }
        ];
        
        // Mock monthly leaders data (slightly different from all-time)
        const mockMonthlyLeaders: ExtendedPlayer[] = [
          {
            id: '3',
            name: 'EtherQueen',
            score: 5670,
            rank: 1,
            quizzesTaken: 12,
            quizzesWon: 4,
            lastActive: '2023-05-02'
          },
          {
            id: '1',
            name: 'CryptoWizard',
            score: 5340,
            rank: 2,
            quizzesTaken: 11,
            quizzesWon: 3,
            lastActive: '2023-05-01'
          },
          {
            id: '5',
            name: 'SatoshiFan',
            score: 4980,
            rank: 3,
            quizzesTaken: 10,
            quizzesWon: 2,
            lastActive: '2023-05-03'
          },
          {
            id: '2',
            name: 'BlockchainNinja',
            score: 4350,
            rank: 4,
            quizzesTaken: 9,
            quizzesWon: 2,
            lastActive: '2023-05-03'
          },
          {
            id: '9',
            name: 'AltcoinHunter',
            score: 3960,
            rank: 5,
            quizzesTaken: 8,
            quizzesWon: 1,
            lastActive: '2023-05-03'
          },
          {
            id: '4',
            name: 'TokenMaster',
            score: 3540,
            rank: 6,
            quizzesTaken: 7,
            quizzesWon: 1,
            lastActive: '2023-05-01'
          },
          {
            id: '8',
            name: 'MetaMasker',
            score: 3240,
            rank: 7,
            quizzesTaken: 6,
            quizzesWon: 1,
            lastActive: '2023-05-02'
          },
          {
            id: '6',
            name: 'NFTcollector',
            score: 2970,
            rank: 8,
            quizzesTaken: 6,
            quizzesWon: 0,
            lastActive: '2023-05-02'
          },
          {
            id: '11',
            name: 'GasOptimizer',
            score: 2760,
            rank: 9,
            quizzesTaken: 5,
            quizzesWon: 0,
            lastActive: '2023-05-01'
          },
          {
            id: '7',
            name: 'DeFiGuru',
            score: 2490,
            rank: 10,
            quizzesTaken: 5,
            quizzesWon: 0,
            lastActive: '2023-05-01'
          }
        ];
        
        // Mock recent quiz results
        const mockRecentResults: QuizResult[] = [
          {
            quiz_title: 'Blockchain Fundamentals',
            quiz_date: '2023-05-03',
            player_name: 'EtherQueen',
            score: 980,
            position: 1,
            prize: '50 PHAR'
          },
          {
            quiz_title: 'Blockchain Fundamentals',
            quiz_date: '2023-05-03',
            player_name: 'SatoshiFan',
            score: 920,
            position: 2,
            prize: '25 PHAR'
          },
          {
            quiz_title: 'Blockchain Fundamentals',
            quiz_date: '2023-05-03',
            player_name: 'BlockchainNinja',
            score: 890,
            position: 3,
            prize: '10 PHAR'
          },
          {
            quiz_title: 'DeFi Protocols',
            quiz_date: '2023-05-02',
            player_name: 'CryptoWizard',
            score: 950,
            position: 1,
            prize: '75 PHAR'
          },
          {
            quiz_title: 'DeFi Protocols',
            quiz_date: '2023-05-02',
            player_name: 'DeFiGuru',
            score: 910,
            position: 2,
            prize: '40 PHAR'
          },
          {
            quiz_title: 'NFT Revolution',
            quiz_date: '2023-05-01',
            player_name: 'NFTcollector',
            score: 870,
            position: 1,
            prize: '60 PHAR'
          },
          {
            quiz_title: 'Crypto Economics',
            quiz_date: '2023-04-30',
            player_name: 'TokenMaster',
            score: 920,
            position: 1,
            prize: '55 PHAR'
          },
          {
            quiz_title: 'Web3 Development',
            quiz_date: '2023-04-28',
            player_name: 'BlockchainNinja',
            score: 980,
            position: 1,
            prize: '65 PHAR'
          }
        ];
        
        // Set the mock data
        setTopPlayers(mockTopPlayers);
        setMonthlyLeaders(mockMonthlyLeaders);
        setRecentResults(mockRecentResults);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLeaderboardData();
  }, [user]);
  
  // Helper function to render trophy icons based on rank
  const renderRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Award className="h-6 w-6 text-amber-700" />;
    return null;
  };
  
  // Generate user initials for avatar
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
        <p className="text-muted-foreground mb-8">
          Top quiz performers across the PharosQuiz platform.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main leaderboard */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="all-time" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all-time">All-Time Leaders</TabsTrigger>
                <TabsTrigger value="monthly">Monthly Leaders</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all-time">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>All-Time Leaderboard</CardTitle>
                    <CardDescription>
                      Top players by total points earned across all quizzes.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[60px]">Rank</TableHead>
                          <TableHead>Player</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead className="hidden md:table-cell">Quizzes</TableHead>
                          <TableHead className="hidden md:table-cell">Wins</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topPlayers.map((player) => (
                          <TableRow key={player.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                {player.rank <= 3 ? (
                                  renderRankIcon(player.rank)
                                ) : (
                                  <span className="w-6 flex justify-center">{player.rank}</span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={player.avatarUrl} alt={player.name} />
                                  <AvatarFallback className="bg-neonCyan text-pharosNavy">
                                    {getInitials(player.name)}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{player.name}</span>
                                {player.id === user?.id && (
                                  <Badge variant="outline" className="ml-2">You</Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="font-bold">{player.score.toLocaleString()} pts</TableCell>
                            <TableCell className="hidden md:table-cell">{player.quizzesTaken}</TableCell>
                            <TableCell className="hidden md:table-cell">{player.quizzesWon}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="monthly">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Monthly Leaderboard</CardTitle>
                    <CardDescription>
                      Top players for May 2023.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[60px]">Rank</TableHead>
                          <TableHead>Player</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead className="hidden md:table-cell">Quizzes</TableHead>
                          <TableHead className="hidden md:table-cell">Wins</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {monthlyLeaders.map((player) => (
                          <TableRow key={player.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                {player.rank <= 3 ? (
                                  renderRankIcon(player.rank)
                                ) : (
                                  <span className="w-6 flex justify-center">{player.rank}</span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={player.avatarUrl} alt={player.name} />
                                  <AvatarFallback className="bg-neonCyan text-pharosNavy">
                                    {getInitials(player.name)}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{player.name}</span>
                                {player.id === user?.id && (
                                  <Badge variant="outline" className="ml-2">You</Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="font-bold">{player.score.toLocaleString()} pts</TableCell>
                            <TableCell className="hidden md:table-cell">{player.quizzesTaken}</TableCell>
                            <TableCell className="hidden md:table-cell">{player.quizzesWon}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Recent results sidebar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Quiz Results</CardTitle>
                <CardDescription>Latest winners and top scorers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentResults.map((result, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">{result.quiz_title}</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> {result.quiz_date}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {result.position <= 3 && renderRankIcon(result.position)}
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs bg-neonCyan text-pharosNavy">
                              {getInitials(result.player_name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{result.player_name}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{result.score} pts</span>
                          {result.prize && (
                            <Badge className="bg-magentaGlow text-white text-xs">{result.prize}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LeaderboardPage;
