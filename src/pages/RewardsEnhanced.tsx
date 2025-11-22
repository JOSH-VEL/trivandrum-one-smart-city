import { useState, useEffect } from 'react';
import { Coins, Gift, TrendingUp, Clock, Tag, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import { RewardTransaction } from '../types';
import { blink } from '../lib/firebase';
import { motion } from 'framer-motion';

// Public offers available to everyone
const publicOffers = [
  {
    id: 'offer-1',
    title: 'KFC Family Meal Deal',
    description: 'Get 20% off on family meals at any KFC outlet in Trivandrum',
    coins: 50,
    validUntil: '2025-12-31',
    brand: 'KFC',
    category: 'food'
  },
  {
    id: 'offer-2',
    title: 'Lulu Mall Shopping Voucher',
    description: '₹500 shopping voucher on purchases above ₹2000',
    coins: 100,
    validUntil: '2025-12-31',
    brand: 'Lulu Mall',
    category: 'shopping'
  },
  {
    id: 'offer-3',
    title: 'Kovalam Beach Resort Stay',
    description: 'Flat 30% off on weekend stays at premium beach resorts',
    coins: 150,
    validUntil: '2025-12-31',
    brand: 'Kovalam Tourism',
    category: 'tourism'
  },
  {
    id: 'offer-4',
    title: 'Swiggy Food Delivery',
    description: 'Free delivery on orders above ₹300',
    coins: 30,
    validUntil: '2025-12-31',
    brand: 'Swiggy',
    category: 'food'
  },
  {
    id: 'offer-5',
    title: 'Metro Travel Pass',
    description: 'Get 10 free metro rides with monthly pass purchase',
    coins: 75,
    validUntil: '2025-12-31',
    brand: 'Kochi Metro',
    category: 'transport'
  },
];

export function RewardsEnhanced() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<RewardTransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalEarned: 0,
    todayEarned: 0,
    weeklyEarned: 0,
  });

  useEffect(() => {
    if (user) {
      loadTransactions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 pt-20 pb-24 lg:pb-8">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-heading-main)' }}>
            Rewards & <span className="text-gradient">Offers</span>
          </h1>
          <p className="text-lg font-medium" style={{ color: 'var(--color-body)' }}>
            Discover exclusive deals and coupons from top brands
          </p>
        </motion.div>

        {/* User Stats (only if logged in) */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <Card className="glass-premium border-0 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-600" />
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <Coins className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-body-light)' }}>Total Coins</p>
                    <p className="text-3xl font-bold" style={{ color: 'var(--color-heading-main)' }}>{stats.totalEarned}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-premium border-0 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-600" />
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-body-light)' }}>Today</p>
                    <p className="text-3xl font-bold" style={{ color: 'var(--color-heading-main)' }}>{stats.todayEarned}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-premium border-0 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-orange-500 to-red-600" />
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-body-light)' }}>This Week</p>
                    <p className="text-3xl font-bold" style={{ color: 'var(--color-heading-main)' }}>{stats.weeklyEarned}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Public Offers Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: user ? 0.2 : 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-cyan-600" />
            <h2 className="text-3xl font-bold" style={{ color: 'var(--color-heading-sub)' }}>
              Exclusive Offers & Coupons
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicOffers.map((offer, idx) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="glass-premium border-0 h-full hover:shadow-premium transition-all duration-300 group cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 px-4 py-1">
                        {offer.brand}
                      </Badge>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Coins className="w-4 h-4" />
                        <span className="font-bold">{offer.coins}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-cyan-600 transition-colors" style={{ color: 'var(--color-heading-main)' }}>
                      {offer.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4 font-medium leading-relaxed" style={{ color: 'var(--color-body)' }}>
                      {offer.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1" style={{ color: 'var(--color-body-light)' }}>
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
                      </div>
                      <Tag className="w-4 h-4 text-cyan-600" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How to Earn Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: user ? 0.3 : 0.2 }}
        >
          <Card className="glass-premium border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: 'var(--color-heading-main)' }}>
                <Gift className="w-6 h-6 text-cyan-600" />
                How to Earn Coins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="font-bold text-white text-xl">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-lg" style={{ color: 'var(--color-heading-main)' }}>Scan QR Codes</h4>
                    <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--color-body)' }}>
                      Scan QR codes on DOOH screens around the city to earn 20-40 coins per scan
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="font-bold text-white text-xl">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-lg" style={{ color: 'var(--color-heading-main)' }}>Share on Instagram</h4>
                    <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--color-body)' }}>
                      Share campaigns on Instagram for extra 20-30 bonus coins
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="font-bold text-white text-xl">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-lg" style={{ color: 'var(--color-heading-main)' }}>Daily Limit</h4>
                    <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--color-body)' }}>
                      You can earn up to 200 coins per day. Limit resets at midnight.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Personal Transaction History (only if logged in) */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Card className="glass-premium border-0">
              <CardHeader>
                <CardTitle className="text-2xl" style={{ color: 'var(--color-heading-main)' }}>
                  My Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <LoadingSpinner />
                ) : transactions.length > 0 ? (
                  <div className="space-y-3">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 rounded-xl hover:bg-white/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                            <Coins className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-bold" style={{ color: 'var(--color-heading-main)' }}>
                              {transaction.type === 'QR' && 'QR Code Scan'}
                              {transaction.type === 'INSTAGRAM' && 'Instagram Share'}
                              {transaction.type === 'ADMIN' && 'Admin Reward'}
                            </p>
                            <p className="text-sm font-medium" style={{ color: 'var(--color-body-light)' }}>
                              {new Date(transaction.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 text-lg font-bold px-4 py-2">
                          +{transaction.coins}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Gift className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                    <p className="font-bold mb-2" style={{ color: 'var(--color-heading-main)' }}>
                      No transactions yet
                    </p>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-body-light)' }}>
                      Start scanning QR codes to earn your first coins!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
