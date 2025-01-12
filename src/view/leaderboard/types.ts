export interface LeaderboardEntry {
  id: string;
  rank?: number;
  name: string;
  username: string;
  avatar: string;
  exp: number;
  percentage: number;
  isCurrentUser?: boolean;
}
