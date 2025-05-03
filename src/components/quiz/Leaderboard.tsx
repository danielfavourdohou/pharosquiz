
import { Badge } from '@/components/ui/badge';

export interface Player {
  id: string;
  name: string;
  score: number;
  rank?: number;
}

interface LeaderboardProps {
  players: Player[];
  currentUserId?: string;
}

export default function Leaderboard({ players, currentUserId }: LeaderboardProps) {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  
  // Assign ranks (players with the same score get the same rank)
  let currentRank = 1;
  let previousScore = sortedPlayers.length > 0 ? sortedPlayers[0].score : 0;
  
  sortedPlayers.forEach((player, index) => {
    if (index > 0 && player.score < previousScore) {
      currentRank = index + 1;
    }
    player.rank = currentRank;
    previousScore = player.score;
  });
  
  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-4">Leaderboard</h3>
      
      <div className="space-y-2">
        {sortedPlayers.length === 0 ? (
          <div className="text-center p-4 text-muted-foreground">
            No players yet
          </div>
        ) : (
          sortedPlayers.map((player) => (
            <div 
              key={player.id}
              className={`flex items-center justify-between p-3 rounded-md ${
                player.id === currentUserId 
                  ? 'bg-muted border-2 border-pharos-primary' 
                  : 'bg-card'
              } ${player.rank && player.rank <= 3 ? 'border-l-4 border-l-pharos-primary' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                  player.rank === 1 ? 'bg-yellow-500' : 
                  player.rank === 2 ? 'bg-gray-400' : 
                  player.rank === 3 ? 'bg-amber-700' : 
                  'bg-muted-foreground'
                }`}>
                  {player.rank}
                </div>
                <div>
                  {player.name}
                  {player.id === currentUserId && (
                    <Badge variant="outline" className="ml-2 text-xs">You</Badge>
                  )}
                </div>
              </div>
              <div className="font-semibold">{player.score} pts</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
