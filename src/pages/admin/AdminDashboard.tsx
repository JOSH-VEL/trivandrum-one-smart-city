import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, QrCode, Coins, TrendingUp, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { blink } from '../../lib/firebase';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalScans: 0,
    totalRewards: 0,
    activeCampaigns: 0,
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    loadStats();
  }, [user, navigate]);

  async function loadStats() {
    setLoading(true);
    try {
      // Get total users
      const users = await blink.db.users.list();
      const totalUsers = users.length;

      // Get total scans
      const scans = await blink.db.qrEvents.list();
      const totalScans = scans.length;

      // Get total rewards
      const rewards = await blink.db.rewardTransactions.list();
      let totalRewards = 0;
      rewards.forEach((reward: any) => {
        totalRewards += reward.coins;
      });

      // Get active campaigns
      const campaigns = await blink.db.campaigns.list({
        where: { active: 1 }
      });
      const activeCampaigns = campaigns.length;

      setStats({ totalUsers, totalScans, totalRewards, activeCampaigns });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen pt-20 pb-24 lg:pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your smart city platform
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Scans</p>
                  <p className="text-2xl font-bold">{stats.totalScans}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Coins className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rewards Given</p>
                  <p className="text-2xl font-bold">{stats.totalRewards}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Campaigns</p>
                  <p className="text-2xl font-bold">{stats.activeCampaigns}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button onClick={() => navigate('/admin/campaigns')} className="h-auto p-6">
                <div className="text-center">
                  <QrCode className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-semibold">Manage Campaigns</p>
                  <p className="text-xs opacity-80 mt-1">Create and edit campaigns</p>
                </div>
              </Button>

              <Button onClick={() => navigate('/admin/users')} variant="outline" className="h-auto p-6">
                <div className="text-center">
                  <Users className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-semibold">Manage Users</p>
                  <p className="text-xs opacity-80 mt-1">View and manage users</p>
                </div>
              </Button>

              <Button onClick={() => navigate('/admin/analytics')} variant="outline" className="h-auto p-6">
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-semibold">Analytics</p>
                  <p className="text-xs opacity-80 mt-1">View detailed insights</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Welcome to Trivandrum One Admin</h3>
            <p className="text-sm text-muted-foreground">
              This dashboard provides comprehensive tools to manage your smart city platform.
              Monitor user activity, manage campaigns, analyze trends, and ensure smooth operations.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
