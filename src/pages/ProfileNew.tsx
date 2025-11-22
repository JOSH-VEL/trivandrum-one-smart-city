// Add ProfileNew.tsx content hereimport { useState, useEffect } from 'react';
import { User, MapPin, Gift, Bookmark, TrendingUp, Calendar, Award, Settings, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { blink } from '../lib/firebase';
import { motion } from 'framer-motion';
import { LoadingSpinner } from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

interface RewardTransaction {
  id: string;
  type: string;
  coins: number;
  campaignId?: string;
  createdAt: string;
}

export function ProfileNew() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [rewardHistory, setRewardHistory] = useState<RewardTransaction[]>([]);
  const [savedPlaces, setSavedPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user?.id) {
      loadUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const loadUserData = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      // Load reward history
      const rewards = await blink.db.rewardTransactions.list({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        limit: 50,
      });
      setRewardHistory(rewards);

      // TODO: Load saved places when feature is implemented
      setSavedPlaces([]);
    } catch (error) {
      console.error('Error loading user data:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await blink.auth.logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 pt-20 pb-24 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getInitials = (name?: string, email?: string) => {
    if (name) {
      const parts = name.split(' ');
      return parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : parts[0][0];
    }
    return email ? email[0].toUpperCase() : 'U';
  };

  const totalCoinsEarned = rewardHistory.reduce((sum, tx) => sum + (tx.coins || 0), 0);
  const totalScans = rewardHistory.filter(tx => tx.type === 'QR').length;
  const instagramRewards = rewardHistory.filter(tx => tx.type === 'INSTAGRAM').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 pt-20 pb-24 lg:pb-8">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="border-slate-200 bg-white overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-cyan-500 to-blue-600" />
            <CardContent className="relative px-6 pb-6">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-4 -mt-16">
                <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                  <AvatarImage src={user.avatarUrl} />
                  <AvatarFallback className="text-3xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                    {getInitials(user.displayName, user.email)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 md:mt-4">
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    {user.displayName || user.email}
                  </h1>
                  <p className="text-slate-600 mb-4">{user.email}</p>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 px-4 py-2 text-base">
                      <Gift className="w-4 h-4 mr-2" />
                      {user.totalCoins || 0} Coins
                    </Badge>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-900 border-0 px-4 py-2 text-base">
                      <Calendar className="w-4 h-4 mr-2" />
                      Joined {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2 md:mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/profile/settings')}
                    className="border-slate-200 hover:bg-slate-50"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="border-slate-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">{totalCoinsEarned}</div>
                  <div className="text-slate-600 text-sm">Total Coins Earned</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">{totalScans}</div>
                  <div className="text-slate-600 text-sm">QR Codes Scanned</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Bookmark className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">{savedPlaces.length}</div>
                  <div className="text-slate-600 text-sm">Saved Places</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white border border-slate-200 p-1">
              <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                Overview
              </TabsTrigger>
              <TabsTrigger value="rewards" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                Reward History
              </TabsTrigger>
              <TabsTrigger value="saved" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                Saved Places
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-slate-900">Account Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-600">Email</span>
                    <span className="font-medium text-slate-900">{user.email}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-600">Display Name</span>
                    <span className="font-medium text-slate-900">{user.displayName || 'Not set'}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-600">Total Coins</span>
                    <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0">
                      {user.totalCoins || 0} Coins
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-600">Daily Coins Earned</span>
                    <span className="font-medium text-slate-900">{user.dailyCoins || 0} / 100</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-slate-600">Role</span>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-900 border-0">
                      {user.role || 'user'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rewards" className="mt-6">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-slate-900">Reward History</CardTitle>
                </CardHeader>
                <CardContent>
                  {rewardHistory.length === 0 ? (
                    <div className="text-center py-12">
                      <Gift className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-600 text-lg font-medium mb-2">No rewards yet</p>
                      <p className="text-slate-500 text-sm mb-4">Start scanning QR codes to earn coins</p>
                      <Button
                        onClick={() => navigate('/explore')}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                      >
                        Explore Now
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {rewardHistory.map((tx) => (
                        <div
                          key={tx.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              tx.type === 'QR' ? 'bg-cyan-100' : 
                              tx.type === 'INSTAGRAM' ? 'bg-purple-100' : 
                              'bg-blue-100'
                            }`}>
                              <Gift className={`w-5 h-5 ${
                                tx.type === 'QR' ? 'text-cyan-600' : 
                                tx.type === 'INSTAGRAM' ? 'text-purple-600' : 
                                'text-blue-600'
                              }`} />
                            </div>
                            <div>
                              <div className="font-medium text-slate-900">
                                {tx.type === 'QR' ? 'QR Code Scan' : 
                                 tx.type === 'INSTAGRAM' ? 'Instagram Share' : 
                                 tx.type}
                              </div>
                              <div className="text-sm text-slate-500">
                                {new Date(tx.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </div>
                            </div>
                          </div>
                          <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0">
                            +{tx.coins} Coins
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="saved" className="mt-6">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-slate-900">Saved Places</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Bookmark className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600 text-lg font-medium mb-2">No saved places yet</p>
                    <p className="text-slate-500 text-sm mb-4">Save your favorite places to visit them later</p>
                    <Button
                      onClick={() => navigate('/explore')}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                    >
                      Explore Places
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}

