import { useState, useEffect } from 'react';
import { Coins, Gift, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import { RewardTransaction } from '../types';
import { blink } from '../lib/firebase';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

export function Rewards() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<RewardTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEarned: 0,
    todayEarned: 0,
    weeklyEarned: 0,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (user) {
      loadTransactions();
    } else {
      setLoading(false);
    }
  }, [user]);

  async function loadTransactions() {
    if (!user) return;

    setLoading(true);
    try {
      const results = await blink.db.rewardTransactions.list({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        limit: 20
      });

      setTransactions(results as RewardTransaction[]);
      calculateStats(results as RewardTransaction[]);
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
    setLoading(false);
  }

  function calculateStats(transactions: RewardTransaction[]) {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const todayEarned = transactions
      .filter((t) => t.createdAt.split('T')[0] === today)
      .reduce((sum, t) => sum + t.coins, 0);

    const weeklyEarned = transactions
      .filter((t) => new Date(t.createdAt) >= weekAgo)
      .reduce((sum, t) => sum + t.coins, 0);

    setStats({
      totalEarned: user?.totalCoins || 0,
      todayEarned,
      weeklyEarned,
    });
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-20 pb-24 lg:pb-8">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto text-center p-8">
            <Coins className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">Sign In Required</h2>
            <p className="text-muted-foreground mb-6">
              Sign in to view your rewards and start earning coins
            </p>
            <Button onClick={() => navigate('/login')}>Sign In</Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-24 lg:pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Rewards</h1>
          <p className="text-muted-foreground">
            Track your coins and reward history
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="gradient-primary text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Coins className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm opacity-90">Total Coins</p>
                  <p className="text-3xl font-bold">{stats.totalEarned}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Today</p>
                  <p className="text-3xl font-bold">{stats.todayEarned}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-3xl font-bold">{stats.weeklyEarned}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How to Earn */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              How to Earn Coins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-primary">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Scan QR Codes</h4>
                  <p className="text-sm text-muted-foreground">
                    Scan QR codes on DOOH screens around the city to earn 20-40 coins per scan
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-secondary">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Share on Instagram</h4>
                  <p className="text-sm text-muted-foreground">
                    Share campaigns on Instagram for extra 20-30 bonus coins
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-accent">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Daily Limit</h4>
                  <p className="text-sm text-muted-foreground">
                    You can earn up to 200 coins per day. Limit resets at midnight.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <LoadingSpinner />
            ) : transactions.length > 0 ? (
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Coins className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {transaction.type === 'QR' && 'QR Code Scan'}
                          {transaction.type === 'INSTAGRAM' && 'Instagram Share'}
                          {transaction.type === 'ADMIN' && 'Admin Reward'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-lg font-semibold">
                      +{transaction.coins}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Gift className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No transactions yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Start scanning QR codes to earn your first coins!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
